// config/changePasswordLanguages.js
export const changePasswordTranslations = {
    en: {
      changePassword: {
        title: "Change Password",
        emailLabel: "Email",
        emailPlaceholder: "Enter your email",
        currentPasswordLabel: "Current Password",
        currentPasswordPlaceholder: "Enter current password",
        newPasswordLabel: "New Password",
        newPasswordPlaceholder: "Enter new password",
        confirmPasswordLabel: "Confirm New Password",
        confirmPasswordPlaceholder: "Confirm new password",
        changeButton: "Change Password",
        successMessage: "Password changed successfully!",
        closeButton: "Close",
        passwordStrength: {
          weak: "Weak",
          strong: "Strong"
        },
        errors: {
          invalidEmail: "Please enter a valid email address.",
          invalidPassword: "Password must be at least 8 characters, contain 1 uppercase letter, 1 number, and 1 special character.",
          samePassword: "New password cannot be the same as the current password.",
          passwordMismatch: "New passwords do not match!",
          serverError: "An error occurred while changing the password.",
          networkError: "Failed to change the password. Please try again."
        }
      }
    },
    si: {
      changePassword: {
        title: "මුරපදය වෙනස් කරන්න",
        emailLabel: "ඊමේල්",
        emailPlaceholder: "ඔබගේ ඊමේල් ඇතුලත් කරන්න",
        currentPasswordLabel: "වත්මන් මුරපදය",
        currentPasswordPlaceholder: "වත්මන් මුරපදය ඇතුලත් කරන්න",
        newPasswordLabel: "නව මුරපදය",
        newPasswordPlaceholder: "නව මුරපදය ඇතුලත් කරන්න",
        confirmPasswordLabel: "නව මුරපදය තහවුරු කරන්න",
        confirmPasswordPlaceholder: "නව මුරපදය තහවුරු කරන්න",
        changeButton: "මුරපදය වෙනස් කරන්න",
        successMessage: "මුරපදය සාර්ථකව වෙනස් කරන ලදී!",
        closeButton: "වසන්න",
        passwordStrength: {
          weak: "දුර්වල",
          strong: "ශක්තිමත්"
        },
        errors: {
          invalidEmail: "කරුණාකර වලංගු ඊමේල් ලිපිනයක් ඇතුලත් කරන්න.",
          invalidPassword: "මුරපදය අක්ෂර 8ක්වත්, විශාල අකුරක්වත්, අංකයක්වත් සහ විශේෂ අක්ෂරයක්වත් අඩංගු විය යුතුය.",
          samePassword: "නව මුරපදය වත්මන් මුරපදයට සමාන විය නොහැක.",
          passwordMismatch: "නව මුරපද ගැලපෙන්නේ නැත!",
          serverError: "මුරපදය වෙනස් කිරීමේදී දෝෂයක් ඇතිවිය.",
          networkError: "මුරපදය වෙනස් කිරීම අසාර්ථක විය. කරුණාකර නැවත උත්සාහ කරන්න."
        }
      }
    }
  };