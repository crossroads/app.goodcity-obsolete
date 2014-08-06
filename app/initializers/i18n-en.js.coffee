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

      "index.title" : "Crossroads Foundation Presents"
      "index.donate_goods" : "Donate your quality goods to people in need"
      "index.how" : "How Does It Work?"

      "tour.register" : "Start Now"
      "tour.step1.title" : "Step 1: Register"
      "tour.step1.sms_pin" : "We'll SMS a four-digit PIN code to confirm it's you!"
      "tour.step2.title" : "Step 2: Add Items"
      "tour.step2.quality_items" : "Good quality items only, please!"
      "tour.step2.photograph" : "Photograph an item"
      "tour.step2.describe_item" : "Describe an item"
      "tour.step2.repeat" : "Repeat for each item you wish to donate"
      "tour.step3.title" : "Step 3: Choose Delivery"
      "tour.step3.rush" : "Rush"
      "tour.step3.pay" : "Pay for fast collection (recommended!)"
      "tour.step3.wait" : "Wait"
      "tour.step3.until" : "until our hard-working volunteers can fit you in the schedule"
      "tour.step3.drop" : "Drop Off"
      "tour.step3.arrange" : "Arrange a time to deliver the items to us"
      "tour.step4.title" : "Step 4: Confirm"
      "tour.step4.confirm" : "Our friendly volunteers will confirm:"
      "tour.step4.accepted_items" : "Accepted items"
      "tour.step4.logistics" : "Logistics details"
      "tour.step4.anything_else" : "Anything else"
      "tour.step5.title" : "Step 5: Double Your Good Deed"
      "tour.step5.financial" : "You are welcome to contribute financially to the costs of helping people receive the items they need. Like Mr Cho who received a washing machine after fire destroyed his home."
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

      "items":
        "add_item":
          "condition": "Condition?"
          "edit_image" : "Edit Image"

      "item":
        "item_details" : "Item details:"
        "donor_description": "Description: {{donorDescription}}"
        "condition": "Condition: {{condition}}"

      # The following are for the I18n example template and can be removed soon.
      "i18nexample.items.heading": "Items"
      "i18nexample.item.title.one": "One item"
      "i18nexample.item.title.other": "{{count}} items"
      "i18nexample.item.new.title": "New item"
      "i18nexample.i18n.pluralisation": "Pluralisation"

    # this is how we set default language
    Ember.I18n.translations = Ember.I18n.translation_store.en

`export default I18nTranslationsEn`
