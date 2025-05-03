// src/translations/checkoutTranslations.js
export const translations = {
    en: {
      title: "CHECKOUT",
      senderTitle: "Sender Details",
      recipientTitle: "Recipient Details",
      paymentTitle: "Payment Details",
      
      senderLabels: {
        firstName: "First Name*",
        lastName: "Last Name*",
        zipCode: "Zip Code*",
        phone: "Phone Number*",
        email: "Email*"
      },
      
      senderPlaceholders: {
        firstName: "First Name",
        lastName: "Last Name",
        zipCode: "Zip Code",
        phone: "Phone Number",
        email: "Email"
      },
      
      collectionTimeLabel: "Waste Collection Time*",
      timePlaceholder: "Select a time",
      timeOptions: [
        { value: "Morning", label: "Morning (9AM-12PM)" },
        { value: "Afternoon", label: "Afternoon (12PM-3PM)" },
        { value: "Evening", label: "Evening (3PM-6PM)" }
      ],
      
      sameAsSender: "Recipient is the same as sender",
      
      recipientLabels: {
        firstName: "First Name*",
        lastName: "Last Name*",
        zipCode: "Zip Code*",
        phone: "Phone Number*"
      },
      
      recipientPlaceholders: {
        firstName: "Recipient First Name",
        lastName: "Recipient Last Name",
        zipCode: "Recipient Zip Code",
        phone: "Recipient Phone Number"
      },
      
      paymentMethods: [
        { value: "Online", label: "Online Payment" },
        { value: "Cash", label: "Cash on Delivery" }
      ],
      
      termsText: ["I agree to the ", "terms and conditions"],
      importantNote: ["Important:", " Waste disposal guidelines are essential for proper waste management."],
      guidanceLink: "Click here for more information on waste disposal",
      submitButton: "Place Order",
      
      errors: {
        email: "Please enter a valid email address.",
        phone: "Please enter a valid 10-digit phone number.",
        firstName: "First Name is required.",
        lastName: "Last Name is required.",
        zipCode: "Please enter a valid zip code (up to 6 digits).",
        recipientFirstName: "Recipient First Name is required.",
        recipientLastName: "Recipient Last Name is required.",
        recipientZipCode: "Please enter a valid recipient zip code.",
        recipientPhone: "Please enter a valid recipient phone number.",
        collectionTime: "You must select a waste collection time.",
        paymentMethod: "Please select a payment method.",
        terms: "You must agree to the terms and conditions.",
        formError: "Please fix the errors before submitting.",
        missingData: "User ID is missing! Please go back and select a location."
      },
      
      success: {
        processing: "Your order is being processed..."
      }
    },
    
    si: {
      title: "ගෙවීම",
      senderTitle: "යවන්නාගේ විස්තර",
      recipientTitle: "ලබන්නාගේ විස්තර",
      paymentTitle: "ගෙවීම් විස්තර",
      
      senderLabels: {
        firstName: "මුල් නම*",
        lastName: "අවසන් නම*",
        zipCode: "තැපැල් කේතය*",
        phone: "දුරකථන අංකය*",
        email: "විද්‍යුත් තැපෑල*"
      },
      
      senderPlaceholders: {
        firstName: "මුල් නම",
        lastName: "අවසන් නම",
        zipCode: "තැපැල් කේතය",
        phone: "දුරකථන අංකය",
        email: "විද්‍යුත් තැපෑල"
      },
      
      collectionTimeLabel: "කසළ එකතු කිරීමේ වේලාව*",
      timePlaceholder: "වේලාවක් තෝරන්න",
      timeOptions: [
        { value: "Morning", label: "උදේ (9AM-12PM)" },
        { value: "Afternoon", label: "දවල් (12PM-3PM)" },
        { value: "Evening", label: "සවස (3PM-6PM)" }
      ],
      
      sameAsSender: "ලබන්නා යවන්නාට සමානයි",
      
      recipientLabels: {
        firstName: "මුල් නම*",
        lastName: "අවසන් නම*",
        zipCode: "තැපැල් කේතය*",
        phone: "දුරකථන අංකය*"
      },
      
      recipientPlaceholders: {
        firstName: "ලබන්නාගේ මුල් නම",
        lastName: "ලබන්නාගේ අවසන් නම",
        zipCode: "ලබන්නාගේ තැපැල් කේතය",
        phone: "ලබන්නාගේ දුරකථන අංකය"
      },
      
      paymentMethods: [
        { value: "Online", label: "අන්තර්ජාල ගෙවීම" },
        { value: "Cash", label: "බෙදාහැරීමේදී මුදල්" }
      ],
      
      termsText: ["මම එකඟ වෙමි ", "නියමයන් සහ කොන්දේසි"],
      importantNote: ["වැදගත්:", " නිසි අපද්‍රව්‍ය කළමනාකරණය සඳහා අපද්‍රව්‍ය බැහැර කිරීමේ මාර්ගෝපදේශ අත්‍යවශ්‍ය වේ."],
      guidanceLink: "අපද්‍රව්‍ය බැහැර කිරීම පිළිබඳ වැඩි විස්තර සඳහා මෙතැන ක්ලික් කරන්න",
      submitButton: "ඇණවුම් කරන්න",
      
      errors: {
        email: "කරුණාකර වලංගු ඊමේල් ලිපිනයක් ඇතුළත් කරන්න.",
        phone: "කරුණාකර වලංගු දුරකථන අංකයක් ඇතුළත් කරන්න (ඉලක්කම් 10).",
        firstName: "මුල් නම අවශ්‍යයි.",
        lastName: "අවසන් නම අවශ්‍යයි.",
        zipCode: "කරුණාකර වලංගු තැපැල් කේතයක් ඇතුළත් කරන්න (උපරිම ඉලක්කම් 6).",
        recipientFirstName: "ලබන්නාගේ මුල් නම අවශ්‍යයි.",
        recipientLastName: "ලබන්නාගේ අවසන් නම අවශ්‍යයි.",
        recipientZipCode: "කරුණාකර ලබන්නාගේ වලංගු තැපැල් කේතයක් ඇතුළත් කරන්න.",
        recipientPhone: "කරුණාකර ලබන්නාගේ වලංගු දුරකථන අංකයක් ඇතුළත් කරන්න.",
        collectionTime: "ඔබ අපද්‍රව්‍ය එකතු කිරීමේ වේලාවක් තෝරා ගත යුතුය.",
        paymentMethod: "කරුණාකර ගෙවීම් ක්‍රමයක් තෝරන්න.",
        terms: "ඔබ නියමයන් සහ කොන්දේසි වලට එකඟ විය යුතුය.",
        formError: "ඉදිරිපත් කිරීමට පෙර දෝෂ නිවැරදි කරන්න.",
        missingData: "පරිශීලක හැඳුනුම්පත නැත! කරුණාකර ආපසු ගොස් ස්ථානයක් තෝරන්න."
      },
      
      success: {
        processing: "ඔබගේ ඇණවුම සැකසෙමින් පවතී..."
      }
    }
  };