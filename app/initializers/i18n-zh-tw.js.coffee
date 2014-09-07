`import Ember from "ember"`

I18nTranslationsZhTw =
  name: 'i18n-zh-tw'
  initialize: ->

    Ember.I18n.translation_store = Ember.I18n.translation_store || {}

    Ember.I18n.translation_store['zh-tw'] =

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
          "info" : "預訂一輛麵包車和驅動程序在你的<br/>首選 時間同1點擊!<br/>推薦!"
          "cost" : "耗資390-600美元"
          "discount" : "獲取5％折扣 同我們的 <br/>合作夥伴"
          "booking_button" : "前往預訂"
        "alternate" :
          "title" : "另類"
          "info" : "等待12-14天直到我們的<br/>志願者可以收集."
          "cost" : "成本150美元"
          "cost.info" : "關於這項收費"
          "booking_button" : "前往預訂"
        "crossroads" :
          "title" : "交付给我们"
          "info" : "Drop off at Tuen Mun during<br/>our hours of operation."
          "free" : "免費"
          "booking_button" : "詳情及預訂"

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

      "offer":
        "no_items" : "您不必在此優惠的任何物品呢。請添加您的第一個項目!"
        "confirm":
          "heading" : "確認"
          "notice": "因為需要更改每日和<br>存儲是有限我們 赔礼 这<br>我們有時不能接受<br>有些項目."
          "review": "專家志願者將開始回顧的你的品目隨即."
          "thank": "謝謝!"
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

        "review-status" :
          "heading" : "複查狀態"
          "plan_delivery" : "Plan Delivery"

      "items":
        "add_item":
          "condition": "條件?"
          "edit_image" : "編輯形像"
        "new":
          "add_photos" : "添加照片本項"

      "item":
        "item_details" : "項詳情:"
        "donor_description": "說明: {{donorDescription}}"
        "condition": "條件: {{condition}}"

      "_resend":
        "no_sms" : "沒有收到短信代碼?"
        "please_wait" : "請請等待5分鐘..."
        "resend" : "再次發送"

      # The following are for the I18n example template and can be removed soon.
      'i18nexample.items.heading': '項'
      'i18nexample.item.title.one': '一個項目'
      'i18nexample.item.title.other': '{{count}} 項'
      'i18nexample.item.new.title': '新項目'
      'i18nexample.i18n.pluralisation': '的複數'

`export default I18nTranslationsZhTw`
