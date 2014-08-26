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
      "error.message" : "很抱歉，發生錯誤！"
      "next" : "未來"

      "index.title" : "十字路口基金會禮物"
      "index.donate_goods" : "捐出你的精品給需要的人"
      "index.how" : "它是如何工作的？"

      "plan_delivery":
        "title" : "Plan Delivery"
        "fastest" :
          "title" : "Fastest"
          "info" : "Book a van & drivar at your<br/>preferred time with 1 click!<br/>Recommended!"
          "cost" : "Cost $390-$600"
          "discount" : "Get 5% off with our<br/>partner"
          "booking_button" : "Go to Booking"

        "alternate" :
          "title" : "Alternative"
          "info" : "Wait 12-14 days until our<br/>volunteers can collect."
          "cost" : "Cost $150"
          "cost.info" : "About this charge"
          "booking_button" : "Go to Booking"

        "crossroads" :
          "title" : "Deliver to Us"
          "info" : "Drop off at Tuen Mun during<br/>our hours of operation."
          "free" : "Free"
          "booking_button" : "Details & Booking"

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


      # The following are for the I18n example template and can be removed soon.
      'i18nexample.items.heading': '項'
      'i18nexample.item.title.one': '一個項目'
      'i18nexample.item.title.other': '{{count}} 項'
      'i18nexample.item.new.title': '新項目'
      'i18nexample.i18n.pluralisation': '的複數'

`export default I18nTranslationsZhTw`
