`import Ember from "ember"`

I18nTranslationsEn =
  name: "i18n-en"
  initialize: ->

    Ember.I18n.translation_store = Ember.I18n.translation_store || {}

    Ember.I18n.translation_store.en =
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

      "application":
        "home" : "Home"
        "all_offers" : "All Offers"
        "login" : "Login"
        "logout" : "Logout"
        "register" : "Register"

      "authenticate":
        "input_code" : "Input Code"

      "districts":
        "all" : "All"

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
          "name" : "Name: {{collectionContactName}}"
          "total_items" : "Total items: {{itemCount}}"
          "see_more" : "See more..."

      "offer":
        "no_items" : "You don't have any items in this offer yet. Please add your first item!",
        "confirm":
          "heading" : "Confirm"
          "notice": "Because needs change daily and <br> storage is limited we apologise that <br> we sometimes cannot accept <br> some items."
          "review": "Expert volunteers will start reviewing <br> your items immediately."
          "thank": "Thank You!"
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
        "review-status" :
          "heading" : "Review Status"

      "items":
        "add_item":
          "condition": "Condition?"
          "edit_image" : "Edit Image"
        "new":
          "add_photos" : "Add photos of this item"

      "item":
        "item_details" : "Item details:"
        "donor_description": "Description: {{donorDescription}}"
        "condition": "Condition: {{condition}}"

      "_resend":
        "no_sms" : "Haven't received SMS code?"
        "please_wait" : "Please wait 5 minutes..."
        "resend" : "Resend"

      "_verification_pin":
        "input_code" : "Input 6-digit SMS code we just sent you:"
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

      # Components
      "upload-images":
        "angles" : "Got all the angles of this item?"
        "favourite" : "Favourite"
        "add_another" : "Add another image"

      # The following are for the I18n example template and can be removed soon.
      "i18nexample.items.heading": "Items"
      "i18nexample.item.title.one": "One item"
      "i18nexample.item.title.other": "{{count}} items"
      "i18nexample.item.new.title": "New item"
      "i18nexample.i18n.pluralisation": "Pluralisation"

    # this is how we set default language
    Ember.I18n.translations = Ember.I18n.translation_store.en

`export default I18nTranslationsEn`
