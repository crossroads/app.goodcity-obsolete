`import Ember from "ember"`

I18nTranslationsEn =
  name: "i18n-en"
  initialize: ->

    Ember.I18n.translation_store = Ember.I18n.translation_store || {}

    Ember.I18n.translation_store.en =
      "crossroads" : "Crossroads"
      "language": "en"
      "loading": "Loading..."
      "goodcity.hk" : "GoodCity.HK"
      "skip_intro" : "Skip intro"
      "next" : "Next"
      "back" : "Back"
      "error.message" : "Sorry, an error occurred!"
      "images" : "Images"
      "delete" : "Delete"
      "edit" : "Edit"
      "remove" : "Remove"
      "yes" : "Yes"
      "no" : "No"
      "ok" : "OK"
      "index.title" : "Crossroads Foundation Presents"
      "index.donate_goods" : "Donate your quality goods to people in need"
      "index.how" : "How Does It Work?"
      "full_name" : "{{firstName}} {{lastName}}"
      "select_district" : "Select a district"

      "application":
        "home" : "Home"
        "all_offers" : "All Offers"
        "login" : "Login"
        "logout" : "Logout"
        "register" : "Register"
        "tour" : "Tour"

      "authenticate":
        "input_code" : "Input Code"

      "contact":
        "title" : "Contact Details"
        "confirm_location" : "Who should we call to confirm location & address detail?"
        "name" : "Name"
        "phone" : "Phone"
        "address" : "Collection address (Hong Kong)"
        "street" : "Street"
        "building" : "Building"
        "flat" : "Flat"
        "done" : "Done"

      "districts":
        "all" : "All"

      "plan_delivery":
        "title" : "Plan Transport"
        "fastest" :
          "title" : "Fastest"
          "info" : "Hire a vehicle with a few clicks.<br/>Recommended!"
          "cost" : "From $190"
          "booking_button" : "Go to Booking"
          "learn_more": "Learn More"

        "alternate" :
          "title" : "Alternative"
          "info" : "Wait 14+ days until our team<br/>can collect from your area."
          "cost" : "Fee {{cost}}"
          "booking_button" : "Go to Booking"

        "crossroads" :
          "title" : "Deliver to Us"
          "info" : "Drop off at Tuen Mun during<br/>our hours of operation."
          "free" : "Free"
          "booking_button" : "Details & Booking"

      "gogovan":
        "porterage":
          "title" : "Porterage Charges"
          "driver" : "This needs to be negotiated with driver."
          "price_factors" : "The price will vary based on many factors, including"
          "item_count_size" : "How many items of what size"
          "obstacles" : "Stairs or obstacles"
          "park_van" : "Ability to park van unattended"
          "help" : "If you or a friend can help"
          "unwilling_driver" : "If you have large furniture and/or challenging needs you may find drivers are unwilling to take the job or require a significant price."
          "thanks" : "Got it, thank you!"

        "confirm_van" :
          "title" : "Confirm Van"
          "base_fee" : "Base fee"
          "porterage" : "Porterage"
          "speak_english" : "Speak English"
          "trolley" : "Borrow trolley(s)"
          "details" : "Details"
          "other" : "Other"
          "confirm_with_drivar" : "Please confirm total price with driver before loading."
          "name" : "Your Name"
          "phone" : "Phone"
          "book_delivery" : "Confirm & Book"
          "negotiate" : "Negotiate with driver"
          "no_porterage" : "Not Requested"

        "book_van" :
          "title" : "Book Van"
          "location" : "Location"
          "select_day" : "Preferred day/time"
          "crossroads_time" : "Limited to Crossroads' operating hours"
          "requirements" : "Extra Requirements"
          "speak_english" : "Speak English"
          "trolly_cost" : "Borrow trolley(s) + $20/piece"
          "porterage" : "Porterage/go up(negotiate with drivers)"
          "extra_time_charge" : "Extra Time(15 minutes waiting time is included for you to load the van. Extra time incurs a charge.)"
          "get_quote" : "Get Quote"

      "tour":
        "register" : "Start Now"
        "step1.title" : "Step 1: Register"
        "step1.sms_pin" : "We'll SMS a four-digit PIN code to confirm it's you!"
        "step2.title" : "Step 2: Add Items"
        "step2.quality_items" : "Good quality items only, please!"
        "step2.photograph" : "Photograph an item"
        "step2.describe_item" : "Describe an item"
        "step2.repeat" : "Repeat for each item you wish to donate"
        "step3.title" : "Step 3: Choose Delivery"
        "step3.rush" : "Rush"
        "step3.pay" : "Pay for fast collection (recommended!)"
        "step3.wait" : "Wait"
        "step3.until" : "until our hard-working volunteers can fit you in the schedule"
        "step3.drop" : "Drop Off"
        "step3.arrange" : "Arrange a time to deliver the items to us"
        "step4.title" : "Step 4: Confirm"
        "step4.confirm" : "Our friendly volunteers will confirm:"
        "step4.accepted_items" : "Accepted items"
        "step4.logistics" : "Logistics details"
        "step4.anything_else" : "Anything else"
        "step5.title" : "Step 5: Double Your Good Deed"
        "step5.financial" : "You are welcome to contribute financially to the costs of helping people receive the items they need. Like Mr Cho who received a washing machine after fire destroyed his home."

      "offers":
        "index":
          "new_donation" : "Make a New Donation"
          "my_offers" : "My offers"
          "total_items" : "Total items: {{itemCount}}"
          "see_more" : "See more..."
          "complete_offer" : "Complete this Offer"
          "unread_messages" : "Unread messages: {{unreadMessagesCount}}"

      "offer":
        "details" : "Offer details"
        "no_items" : "You don't have any items in this offer yet. Please add your first item!",
        "confirm":
          "heading" : "Confirm"
          "notice": "Because needs change daily and <br> storage is limited we apologise that <br> we sometimes cannot accept <br> some items."
          "review": "Expert volunteers will start reviewing <br> your items immediately."
          "thank": "Thank You!"
          "next" : "OK! Next"
        "submit":
          "heading": "Sale of goods"
          "message": "Occasionally, the best way <br> for a donated item to help the poor <br> is for a charity to sell it. Is sale <br> of item(s) okay?"


        "index":
          "item_count" : "Offer items ({{itemCount}})"
          "add_item" : "Add item"
          "add_items" : "Add items to offer"
          "confirm" : "All Done, Next"
          "review" : "Review Status"
          "cancel" : "Cancel Offer"
          "description" : "Description"
          "condition" : "Condition"

        "offer_details" :
          "heading" : "Offer Details"
          "submitted_status": "Your offer is awaiting review."
          "in_review_status": "Your offer is being reviewed by {{firstName}}."
          "is_collection": "Collection"
          "is_drop_off": "Drop-off"
          "is_gogovan": "Van Booked"
          "reviewed_message": "Review complete!"
          "please": "Please"
          "transport": "arrange transport"
          "offer_messages": "General Messages"
          "accepted": "Accepted"
          "not_needed": "Not needed"
          "closed_offer_message": "Offer closed. No items needed, Sorry."

        "transport_details" :
          "heading": "Transport Details"
          "no_items": "There are no items to transport<br> from this offer."
          "accepted_items": "Accepted items to be transported"
          "time": "Booking Time"
          "name": "Contact Name"
          "phone": "Contact Phone"
          "address": "Address"
          "district": "District"
          "charity_sale": "Charity sale ok?"
          "modify": "Modify"
          "cancel_booking": "Cancel Booking"
          "arrange_transport": "Arrange Transport"
          "wait_for_transport": "Transport arrangements can be made<br> once the review is complete."
          "modify_transport": "Modify district or charity sale details"
          "accepted_items_count": "Items accepted so far ({{acceptedCount}})"

      "items":
        "edit_images":
          "add_photo" : "Add photo"
          "delete_confirm" : "Are you sure you want to delete this image?"
          "cant_delete_last_image" : "You must have at least one image"
          "donating_what" : "What are you donating?"
          "take_photos" : "Take some photos"
          "fullscreen_tooltip" : "toggle fullscreen"
          "favourite_tooltip" : "set as cover image"
          "delete_tooltip" : "delete image"

        "add_item":
          "condition": "Condition?"
          "edit_image" : "Edit photos"
          "save" : "Save Details"
          "description_placeholder" : "What is it? How many items? What's the size?"

      "item":
        "item_details" : "Item details"
        "donor_description": "Description: {{donorDescription}}"
        "condition": "Condition: {{condition}}"
        "cancel" : "Cancel Item"
        "edit" : "Edit Item"
        "submitted_status": "This item is awaiting review."
        "in_review_status": "This item is being reviewed."
        "accepted_status": "This item has been accepted."
        "rejected_status": "This item has been rejected."

      "_resend":
        "no_sms" : "Haven't received SMS code?"
        "please_wait" : "Please wait 5 minutes..."
        "resend" : "Resend"

      "_verification_pin":
        "input_code" : "Input 4-digit SMS code we just sent you:"
        "auth_error" : "Sorry! Please enter the correct pin."

      "login":
        "hk_only" : "Mobile phone # (Hong Kong only)"
        "login" : "Login"
        "smscode": "Get 4-digit SMS code"

      "register":
        "hk_only" : "Mobile phone # (Hong Kong only)"
        "given_name" : "Given name"
        "family_name" : "Family name"
        "districts" : "Districts"
        "register" : "Register"
        "login" : "Login"

      "inbox":
        "title" : "New Offers"
        "new_items" : "New Items"
        "unread_messages" : "Unread Messages: {{unreadMessagesCount}}"
        "in_review" : "In Review"
        "my_list" : "My List"
        "my_offers" : "My Offers"

      "messages":
        "unread" : "Unread ({{unreadCount}})"

      "notifications":
        "text" : "{{text}}"
        "view": "View"

      "review_offer":
        "review_started_by" : "Started by {{firstName}} {{lastName}}"

      "review_item":
        "accept" : "Accept"
        "accept_item" : "Accept Item"
        "reject" : "Reject"
        "reject_item" : "reject Item"
        "not_now" : "Not Now"
        "donor_message" : "Donor"
        "supervisor_message" : "Supervisors"
        "view_lable_guide": "View labeling guide"
        "condition": "Condition"
        "add_component": "Add component"

      # Components
      "upload-images":
        "angles" : "Got all the angles of this item?"
        "favourite" : "Favourite"
        "add_another" : "Add another image"
      "upload-image":
        "upload_error" : "There is an error with your image upload. Please try again after some time."

      # The following are for the I18n example template and can be removed soon.
      "i18nexample.items.heading": "Items"
      "i18nexample.item.title.one": "One item"
      "i18nexample.item.title.other": "{{count}} items"
      "i18nexample.item.new.title": "New item"
      "i18nexample.i18n.pluralisation": "Pluralisation"

    # this is how we set default language
    Ember.I18n.translations = Ember.I18n.translation_store.en

`export default I18nTranslationsEn`
