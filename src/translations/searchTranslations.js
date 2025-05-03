 const translations = {
    en: {
      heading: "To Start Order Enter Address",
      placeholders: {
        address: "Enter Your Home Address",
        streetNumber: "Street Number (e.g., No 4)",
        streetName: "Street Name (e.g., SGA Desilva Road)",
        city: "City (e.g., Ambalangoda)"
      },
      buttons: {
        search: "Search",
        submit: "Submit Address",
        locateMe: "Locate Me",
        cancel: "Cancel",
        confirm: "Confirm"
      },
      modal: {
        title: "Confirm Your Address",
        body: "Please confirm that the following is your correct home address:"
      },
      errors: {
        incomplete: "Please complete all address fields!",
        invalid: "The address you entered is not valid or not found on the map. You can use the 'Locate Me' option to automatically get your current location or you can manually set your address.",
        locationFailed: "Unable to retrieve your location.",
        geolocationUnsupported: "Geolocation is not supported by this browser."
      }
    },
    si: {
      heading: "ඇණවුම ආරම්භ කිරීමට ලිපිනය ඇතුලත් කරන්න",
      placeholders: {
        address: "ඔබේ නිවසේ ලිපිනය ඇතුලත් කරන්න",
        streetNumber: "වීදි අංකය (උදා: අංක 4)",
        streetName: "වීදි නම (උදා: එස්.ජී.ඒ. ද සිල්වා මාවත)",
        city: "නගරය (උදා: අම්බලන්ගොඩ)"
      },
      buttons: {
        search: "සොයන්න",
        submit: "ලිපිනය ඉදිරිපත් කරන්න",
        locateMe: "මෙම ස්ථානය තෝරන්න",
        cancel: "අවලංගු කරන්න",
        confirm: "තහවුරු කරන්න"
      },
      modal: {
        title: "ඔබේ ලිපිනය තහවුරු කරන්න",
        body: "පහත දැක්වෙන ලිපිනය ඔබේ නිවැරදි නිවසේ ලිපිනය බව තහවුරු කරන්න:"
      },
      errors: {
        incomplete: "කරුණාකර සියලු ලිපින ක්ෂේත්‍ර පුරවන්න!",
        invalid: "ඔබ ඇතුලත් කළ ලිපිනය වලංගු නොවේ හෝ සිතියමේ හමු නොවීය. ඔබට 'මාව සොයන්න' විකල්පය භාවිතා කර ඔබේ වත්මන් ස්ථානය ස්වයංක්‍රීයව ලබා ගත හැකිය හෝ ඔබට ඔබේ ලිපිනය අතින් සැකසිය හැකිය.",
        locationFailed: "ඔබේ ස්ථානය ලබා ගැනීමට නොහැකි විය.",
        geolocationUnsupported: "මෙම බ්‍රවුසරය මගින් භූ ස්ථානගත කිරීම සහය නොදක්වයි."
      }
    }
  };
  
  export default translations;