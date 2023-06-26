type Email = {
  subject: string;
  body: string;
};

const extractEmailData = (
  emailContent?: string
): Email => {
  if (!emailContent) {
    return {
      subject: `No subject`,
      body: "",
    };
  }

  if (!emailContent.startsWith("Subject: ")) {
    return {
      subject: `Insights and Answers generated by Porsche Co-Driver`,
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
