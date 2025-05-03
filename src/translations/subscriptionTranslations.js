const translations = {
    en: {
      title: "Subscription Plans",
      daily: {
        title: "Daily Collection",
        details: [
          "Daily waste collection at a specific time of your choosing (up to 10 kg per day).",
          "On-demand pickups within service hours.",
          "Ideal for temporary or high-demand situations, valid for 3 months from the order date.",
          "You can cancel your order at any time.",
          "You can change the collection time to your preferred time after placing the order."
        ]
      },
      weekly: {
        title: "Weekly Collection",
        details: [
          "Scheduled weekly waste collection (up to 20 kg per week) on your chosen day and time, valid for 3 months.",
          "On-demand pickups within service hours.",
          "Great for small businesses or residential communities.",
          "Ideal for those who need consistent weekly service.",
          "You can cancel your order at any time.",
          "You can change the collection time to your preferred time after placing the order"
        ]
      },
      monthly: {
        title: "Monthly Collection",
        details: [
          "One-time collection per month (up to 50 kg per month), valid for 3 months.",
          "Priority customer support.",
          "Ideal for small waste volumes, providing long-term savings.",
          "You can cancel your order at any time.",
          "You can change the collection time to your preferred time after placing the order"
        ]
      },
      oneTime: {
        title: "One-Time Collection",
        details: [
          "Single waste collection (up to 10 kg) without a subscription.",
          "Strictly no collection if the weight exceeds 10 kg.",
          "Waste must be separated into Food, Degradable, and Non-Degradable.",
          "Ideal for occasional clean-ups or minimal waste disposal."
        ]
      },
      note: {
        important: "Important:",
        text: "Daily, Weekly, and Monthly subscription plans are valid for 3 months only. The pick-up date can be chosen on a day of your choice. The pick-up time can be scheduled in the morning, afternoon, or evening. You can select your subscription plan at map selection. Additionally, you can choose your preferred time (morning, afternoon, or evening) for waste collection during checkout."
      }
    },
    si: {
      title: "සාමාජිකත්ව සැලසුම්",
      daily: {
        title: "දිනපතා එකතු කිරීම",
        details: [
          "ඔබේ තෝරාගත් වේලාවක දිනපතා අපද්‍රව්‍ය එකතු කිරීම (දිනකට උපරිම 10 kg දක්වා).",
          "සේවා වේලාවන් තුළ ඉල්ලුම මත ගෙන යාම.",
          "තාවකාලික හෝ ඉහළ ඉල්ලුමක් සඳහා වඩාත් සුදුසුයි, ඇණවුම් දින සිට මාස 3ක් සඳහා වලංගුයි.",
          "ඔබට ඕනෑම වේලාවක ඇණවුම අවලංගු කළ හැකිය.",
          "ඇණවුම තැබීමෙන් පසු ඔබට එකතු කිරීමේ වේලාව ඔබ කැමති වේලාවකට වෙනස් කළ හැකිය."
        ]
      },
      weekly: {
        title: "සතිපතා එකතු කිරීම",
        details: [
          "ඔබ තෝරාගත් දිනයක සහ වේලාවක සතිපතා අපද්‍රව්‍ය එකතු කිරීම (සතියකට උපරිම 20 kg දක්වා), මාස 3ක් සඳහා වලංගුයි.",
          "සේවා වේලාවන් තුළ ඉල්ලුම මත ගෙන යාම.",
          "කුඩා ව්‍යාපාර හෝ නේවාසික ප්‍රජාවන් සඳහා විශිෂ්ටයි.",
          "ස්ථාවර සතිපතා සේවාවක් අවශ්‍ය අයට වඩාත් සුදුසුයි.",
          "ඔබට ඕනෑම වේලාවක ඇණවුම අවලංගු කළ හැකිය.",
          "ඇණවුම තැබීමෙන් පසු ඔබට එකතු කිරීමේ වේලාව ඔබ කැමති වේලාවකට වෙනස් කළ හැකිය."
        ]
      },
      monthly: {
        title: "මාසික එකතු කිරීම",
        details: [
          "මසකට එක් වරක් එකතු කිරීම (මසකට උපරිම 50 kg දක්වා), මාස 3ක් සඳහා වලංගුයි.",
          "ප්‍රමුඛ පාරිභෝගික සහාය.",
          "කුඩා අපද්‍රව්‍ය ප්‍රමාණයන් සඳහා වඩාත් සුදුසුයි, දිගුකාලීන ඉතිරිකිරීම් සපයයි.",
          "ඔබට ඕනෑම වේලාවක ඇණවුම අවලංගු කළ හැකිය.",
          "ඇණවුම තැබීමෙන් පසු ඔබට එකතු කිරීමේ වේලාව ඔබ කැමති වේලාවකට වෙනස් කළ හැකිය."
        ]
      },
      oneTime: {
        title: "එක් වරක් එකතු කිරීම",
        details: [
          "සාමාජිකත්වයකින් තොරව එක් වරක් අපද්‍රව්‍ය එකතු කිරීම (උපරිම 10 kg දක්වා).",
          "බර 10 kg ඉක්මවා ගියහොත් එකතු කිරීමක් සිදු නොවේ.",
          "අපද්‍රව්‍ය ආහාර, දිරාපත් වන, සහ දිරාපත් නොවන ලෙස වෙන් කළ යුතුය.",
          "ඉඳහිට පිරිසිදු කිරීම් හෝ අවම අපද්‍රව්‍ය බැහැර කිරීම සඳහා වඩාත් සුදුසුයි."
        ]
      },
      note: {
        important: "වැදගත්:",
        text: "දිනපතා, සතිපතා, සහ මාසික සාමාජිකත්ව සැලසුම් මාස 3ක් සඳහා පමණක් වලංගුයි. ගෙන යාමේ දිනය ඔබේ තෝරාගැනීම අනුව තෝරාගත හැකිය. ගෙන යාමේ වේලාව උදෑසන, දහවල්, හෝ සවස ලෙස උපලේඛනය කළ හැකිය. ඔබට ඔබේ සාමාජිකත්ව සැලසුම සිතියම් තේරීමේදී තෝරාගත හැකිය. ඊට අමතරව, ගෙවීමේදී ඔබට අපද්‍රව්‍ය එකතු කිරීම සඳහා ඔබ කැමති වේලාව (උදෑසන, දහවල්, හෝ සවස) තෝරාගත හැකිය."
      }
    }
  };
  
  export default translations;