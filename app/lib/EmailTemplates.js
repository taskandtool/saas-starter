Accounts.emailTemplates.siteName = "Revise";

Accounts.emailTemplates.from = "Revise Admin <accounts@revise.com>";

Accounts.emailTemplates.resetPassword.subject = function (user) {
  return "Reset your email";
};
Accounts.emailTemplates.resetPassword.text = function (user, url) {
  url = url.replace('#/', '')
  return "To reset your email, please click the link below:"
   + url;
};
