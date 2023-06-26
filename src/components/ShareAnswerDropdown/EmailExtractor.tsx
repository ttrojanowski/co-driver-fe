type Email = {
  subject: string;
  body: string;
};

const extractEmailData = (
  emailContent?: string,
  fallbackSubject?: string
): Email => {
  if (!emailContent) {
    return {
      subject: `No subject`,
      body: "",
    };
  }

  if (!emailContent.startsWith("Subject: ")) {
    return {
      subject: `Answer to the question: ${fallbackSubject}`,
      body: emailContent,
    };
  }

  const splitEmail = emailContent.split('\n');
  const subject = splitEmail[0].replace('Subject: ', '');
  const body = splitEmail.slice(1).join('\n');

  return {
    subject,
    body,
  };
};

export default extractEmailData;
