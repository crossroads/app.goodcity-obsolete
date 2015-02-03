`import Ember from "ember"`

I18nTranslationsZhTw =
  name: 'i18n-zh-tw'
  initialize: ->

    Ember.I18n.translation_store = Ember.I18n.translation_store || {}

    Ember.I18n.translation_store['zh-tw'] =
      "crossroads" : "Crossroads"
      'language': 'zh-tw'
      'loading': '加載中...'
      "goodcity.hk" : "好人好市"
      "skip_intro" : "跳過介紹"
      "next" : "未來"
      "back" : "回"
      "error.message" : "很抱歉, 發生錯誤！"
      "images" : "圖片"
      "delete" : "刪除"
      "edit" : "編輯"
      "remove" : "刪除"
      "yes" : "是啊"
      "no" : "無"
      "ok" : "行"
      "index.title" : "十字路口基金會禮物"
      "index.donate_goods" : "捐出你的精品給需要的人"
      "index.how" : "它是如何工作的？"
      "full_name" : "{{lastName}} {{firstName}}"
      "select_district" : "Select a district"

      "application":
        "home" : "首頁"
        "all_offers" : "所有優惠"
        "login" : "登入"
        "logout" : "註銷"
        "register" : "報名"
      "authenticate":
        "input_code" : "輸入代碼"
      "districts":
        "all" : "所有"
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

      "plan_delivery":
        "title" : "計劃交付"
        "fastest" :
          "title" : "最快"
          "booking_button" : "前往預訂"
          "info" : "Hire a vehicle with a few clicks.<br/>Recommended!"
          "cost" : "From ${{cost}}"
          "learn_more": "Learn More"
          "gogovan_charges": "Gogovan Bookings"

        "alternate" :
          "title" : "另類"
          "info" : "Wait 14+ days until our team<br/>can collect from your area."
          "cost" : "Fee ${{cost}}"
          "booking_button" : "前往預訂"
          "collection_charges": "Collection Charges"

        "crossroads" :
          "title" : "交付给我们"
          "info" : "Drop off at Tuen Mun during<br/>our hours of operation."
          "free" : "免費"
          "booking_button" : "詳情及預訂"

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
        "register" : "現在開始"
        "step1.title" : "第1步：注册"
        "step1.sms_pin" : "我們將短信四位數的PIN碼以確認它就是你！"
        "step2.title" : "第2步：添加項目"
        "step2.quality_items" : "只有良好的質量的項目，請！"
        "step2.photograph" : "照片中的項目"
        "step2.describe_item" : "描述一個項目"
        "step2.repeat" : "重複你想捐贈的每個項目"
        "step3.title" : "步驟3：選擇配送"
        "step3.rush" : "趕"
        "step3.pay" : "快速收集（推薦）支付"
        "step3.wait" : "等待"
        "step3.until" : "直到我們辛勤工作的志願者可以在日程安排適合你"
        "step3.drop" : "落"
        "step3.arrange" : "安排一個時間交付的項目給我們"
        "step4.title" : "第4步：確認"
        "step4.confirm" : "我們友好志願者將確認："
        "step4.accepted_items" : "接受項目"
        "step4.logistics" : "物流資訊"
        "step4.anything_else" : "還要別的嗎"
        "step5.title" : "第5步：雙擊您的好人好事"
        "step5.financial" : "歡迎您到財政幫助人們得到他們所需要的物品的成本做出貢獻。像趙先生誰收到了洗衣機後，大火燒毀了他的家。"

      "offers":
        "index":
          "new_donation" : "做一個新的捐贈"
          "my_offers" : "我的供應信息"
          "total_items" : "總筆數: {{itemCount}}"
          "see_more" : "查看更多..."
          "complete_offer" : "Complete this Offer"
          "unread_messages" : "Unread messages: {{unreadMessagesCount}}"

      "offer":
        "details" : "优惠详情"
        "no_items" : "您不必在此優惠的任何物品呢。請添加您的第一個項目!"
        "confirm":
          "heading" : "確認"
          "notice": "因為需要更改每日和<br>存儲是有限我們 赔礼 这<br>我們有時不能接受<br>有些項目."
          "review": "專家志願者將開始回顧的你的品目隨即."
          "thank": "謝謝!"
          "next" : "OK! Next"
        "submit":
          "heading": "出售的商品"
          "message": "有時候，對於捐贈項目的最佳途，以幫助窮人是一個慈善機構把它賣掉。是出售物品的好嗎"
        "index":
          "item_count" : "獻 品目 ({{itemCount}})"
          "add_item" : "加項"
          "add_items" : "加品目以獻"
          "confirm" : "全部完成, 下一頁"
          "review" : "複查狀態"
          "cancel" : "取消獻"
          "description" : "說明"
          "condition" : "條件"

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
        "display_joyride" :
          "camera": ""
          "delete": ""
          "all_done_next": ""
          "first_item": ""
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
          "condition": "條件?"
          "edit_image" : "編輯形像"
          "save" : "Save Details"
          "description_placeholder" : "What is it? How many items? What's the size?"

      "item":
        "item_details" : "項詳情:"
        "donor_description": "說明: {{donorDescription}}"
        "condition": "條件: {{condition}}"
        "cancel" : "Cancel Item"
        "edit" : "Edit Item"
        "submitted_status": "This item is awaiting review."
        "in_review_status": "This item is being reviewed."
        "accepted_status": "This item has been accepted."
        "rejected_status": "This item has been rejected."

      "_resend":
        "no_sms" : "沒有收到短信代碼?"
        "please_wait" : "請請等待5分鐘..."
        "resend" : "再次發送"

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
        "reviewed_offers": "Reviewed Offers"
        "scheduled_offers": "Scheduled Offers"
        "closed_offers": "Closed Offers"

      "messages":
        "unread" : "Unread ({{unreadCount}})"
        "owner" : "You"

      "notifications":
        "text" : "{{text}}"
        "view": "View"

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

      "review_offer":
        "review_started_by" : "Started by {{lastName}} {{firstName}}"
        "no_items": "No items needed"
        "close_offer": "Close Offer"
        "items_reviewed": "All items reviewed"
        "set_logistics": "Set logistics"
        "to_complete": "to complete"
        "plan_transport": "User to plan transport."
        "reviewed": "Reviewed"
        "start_review": "Start Review"
        "goods_received_by" : "Goods received by {{lastName}} {{firstName}}"
        "offer_closed_by": "Offer closed by {{lastName}} {{firstName}}"

      "logistics":
        "no_items": "No items to transport."
        "offer_closed": "This offer is closed now."
        "close_offer": "Close Offer"
        "message_donor": "Message Donor"
        "finish_review_request": "Please finish reviewing items first!"
        "accepted_items": "Accepted Items"
        "gogovan_requirement": "Gogovan Reqirement"
        "crossroads_requirement": "Crossroads Requirement"

      # Components
      "upload-images":
        "angles" : "Got all the angles of this item?"
        "favourite" : "Favourite"
        "add_another" : "Add another image"
      "upload-image":
        "upload_error" : "There is an error with your image upload. Please try again after some time."

      # The following are for the I18n example template and can be removed soon.
      'i18nexample.items.heading': '項'
      'i18nexample.item.title.one': '一個項目'
      'i18nexample.item.title.other': '{{count}} 項'
      'i18nexample.item.new.title': '新項目'
      'i18nexample.i18n.pluralisation': '的複數'

`export default I18nTranslationsZhTw`
