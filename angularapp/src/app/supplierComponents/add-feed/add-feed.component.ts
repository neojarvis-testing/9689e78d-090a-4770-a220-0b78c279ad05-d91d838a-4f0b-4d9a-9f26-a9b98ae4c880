import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FeedService } from 'src/app/services/feed.service';
import {ToastrService} from 'ngx-toastr'
@Component({
  selector: 'app-add-feed',
  templateUrl: './add-feed.component.html',
  styleUrls: ['./add-feed.component.css']
})
export class AddFeedComponent implements OnInit {
  feedForm: FormGroup; // Holds form data and validation rules
  editMode = false; // Determines whether the form is in edit mode or add mode
  feedId: string | null = null; // Stores the feed ID for editing, if available

  fields = [
    { name: 'feedName', label: 'Feed Name', type: 'text' },
    { name: 'type', label: 'Type', type: 'text' },
    { name: 'description', label: 'Description', type: 'text' },
    { name: 'unit', label: 'Unit (kg)', type: 'text' }, // Label updated with (kg)
    { name: 'pricePerUnit', label: 'Price Per Unit', type: 'number' }
  ];

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly feedService: FeedService, // Inject FeedService for API communication
    private readonly toastr:ToastrService
  ) {
    /** Initializes the reactive form with validation rules.
     *  Default unit is set to 'kg', and description requires at least 6 characters.
     *  Price per unit must be a positive number. */
    this.feedForm = this.fb.group({
      feedName: ['', Validators.required],
      type: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(6)]],
      unit: ['kg', Validators.required],
      pricePerUnit: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    /** Checks if a feed ID exists in the route parameters.
     *  If an ID is found, sets edit mode to true and loads the feed data.
     *  Uses patchValue() to populate the form while extracting Decimal128 values. */
    this.feedId = this.route.snapshot.params['id'];

    if (this.feedId) {
      this.editMode = true;
      this.feedService.getFeedById(this.feedId).subscribe(feed => {
        this.feedForm.patchValue({
          feedName: feed.feedName,
          type: feed.type,
          description: feed.description,
          unit: feed.unit,
          pricePerUnit: feed.pricePerUnit["$numberDecimal"] // Extracts decimal value properly
        });
      });
    }
  }

  isInvalid(controlName: string): boolean {
    /** Checks if a specific form control is invalid.
     *  A field is marked invalid if it has errors and the user has interacted with it.
     *  Returns true if the field needs validation feedback, otherwise false. */
    const control = this.feedForm.get(controlName);
    return !!(control?.invalid && (control?.dirty || control?.touched));
  }

  goBack(): void {
    /** Navigates the user back to the feed list.
     *  Useful when editing and deciding to cancel changes.
     *  Uses Angular’s Router module to redirect to `/supplier/view-feed`. */
    this.router.navigate(['/supplier/view-feed']);
  }

  onSubmit(): void {
    /** Handles form submission, validating all fields before proceeding.
     *  If edit mode is enabled, updates existing feed; otherwise, adds a new feed.
     *  Converts pricePerUnit to a string before sending the request to prevent errors. */
    if (this.feedForm.invalid) {
      this.feedForm.markAllAsTouched();
      return;
    }

    console.log(this.feedForm.value); // Debugging form data
    const feedData = { ...this.feedForm.value, pricePerUnit: this.feedForm.value.pricePerUnit.toString() };

    if (this.editMode && this.feedId) {
      /** Sends an update request if editing an existing feed.
       *  Displays a success alert and redirects upon completion.
       *  Logs any errors encountered during the API call. */
      this.feedService.updateFeed(this.feedId, feedData).subscribe(() => {
        this.toastr.success('Feed updated successfully!')
        this.router.navigate(['/supplier/view-feed']);
      }, error => {
        console.error('Update failed:', error);
      });
    } else {
      /** Sends an add request for a new feed.
       *  Displays a success alert and redirects upon completion.
       *  Logs any errors encountered during the API call. */
      this.feedService.addFeed(feedData).subscribe(() => {
        this.toastr.success('Feed Added successfully!')
        this.router.navigate(['/supplier/view-feed']);
      }, error => {
        this.toastr.error('Add Failed')
        console.error('Add failed:', error);
      });
    }
  }
}

