import { PDFDocument, PageSizes, StandardFonts } from 'pdf-lib';

const fontSize = {
  heading: 20,
  text: 14,
};

export const createInvoice = async (invoiceData) => {
  const {
    invoiceId,
    date,
    dueDate,
    amount,
    description,
    senderName,
    senderAddress,
    senderPostcode,
    senderCity,
    senderCountry,
    senderPhone,
    senderEmail,
    clientName,
    accountName,
    clientAddress,
    clientPostcode,
    clientCity,
    clientCountry,
    clientEmail,
    clientPhone,
    accountIban,
    accountNumber,
    accountSortCode,
    accountAddress,
    accountPostCode,
    accountCity,
    accountCountry,
    paymentReceived,
    paymentDate,
  } = invoiceData;

  const document = await PDFDocument.create();

  const [width, height] = PageSizes.A4;
  const margin = 20;
  const primaryFont = await document.embedFont(StandardFonts.Helvetica);
  const primaryFontBold = await document.embedFont(StandardFonts.HelveticaBold);
  const page = document.addPage([width, height]); // A4 size
  page.drawText(`Invoice #${invoiceId}`, {
    x: margin,
    y: height - 50,
    size: fontSize.heading,
  });

  const dateText = new Date(date).toLocaleDateString();
  const dateTextWidth = primaryFont.widthOfTextAtSize(dateText, fontSize.text);

  page.drawText(dateText, {
    x: width - margin - dateTextWidth,
    y: height - 50,
    size: fontSize.text,
  });

  page.drawText('From:', {
    x: margin,
    y: height - 100,
    size: fontSize.text,
  });

  let senderDetailsOffset = 125;
  [
    senderName,
    senderAddress,
    senderPostcode,
    senderCity,
    senderCountry,
    senderPhone,
    senderEmail,
  ].forEach((text) => {
    if (text) {
      page.drawText(text, {
        x: margin,
        y: height - senderDetailsOffset,
        size: fontSize.text,
      });
      senderDetailsOffset += 20;
    }
  });

  page.drawText('To:', {
    x: width - margin - primaryFont.widthOfTextAtSize('To:', 14),
    y: height - 100,
    size: fontSize.text,
  });

  let clientDetailsOffset = 125;
  [
    clientName,
    clientAddress,
    clientPostcode,
    clientCity,
    clientCountry,
    clientPhone,
    clientEmail,
  ].forEach((text) => {
    if (text) {
      const textWidth = primaryFont.widthOfTextAtSize(text, fontSize.text);
      page.drawText(text, {
        x: width - margin - textWidth,
        y: height - clientDetailsOffset,
        size: fontSize.text,
      });
      clientDetailsOffset += 20;
    }
  });

  page.drawText('Invoice Details', {
    x: margin,
    y: height - 300,
    size: fontSize.text,
    font: primaryFontBold,
  });

  page.drawText(`${description}`, {
    x: margin,
    y: height - 330,
    size: fontSize.text,
  });

  const amountLabelText = 'Amount';
  const amountLabelTextWidth = primaryFont.widthOfTextAtSize(
    amountLabelText,
    fontSize.text
  );

  page.drawText('Amount', {
    x: width - margin - amountLabelTextWidth,
    y: height - 300,
    size: fontSize.text,
    font: primaryFontBold,
  });

  const amountText = amount;
  const amountTextWidth = primaryFont.widthOfTextAtSize(
    amountText,
    fontSize.text
  );

  page.drawText(amountText, {
    x: width - margin - amountTextWidth,
    y: height - 330,
    size: fontSize.text,
  });

  page.drawText('Method of Payment:', {
    x: margin,
    y: height - 380,
    size: fontSize.text,
    font: primaryFontBold,
  });

  page.drawText(`Name: ${accountName}`, {
    x: margin,
    y: height - 410,
    size: fontSize.text,
  });

  page.drawText(`Account Number: ${accountNumber}`, {
    x: margin,
    y: height - 430,
    size: fontSize.text,
  });

  page.drawText(`Sort Code: ${accountSortCode}`, {
    x: margin,
    y: height - 450,
    size: fontSize.text,
  });

  let offset = 0;
  if (accountIban) {
    page.drawText(`IBAN: ${accountIban}`, {
      x: margin,
      y: height - 470,
      size: fontSize.text,
    });

    offset += 20;
  }

  page.drawText('Address:', {
    x: margin,
    y: height - 470 - offset,
    size: fontSize.text,
  });

  page.drawText(accountAddress, {
    x: margin,
    y: height - 490 - offset,
    size: fontSize.text,
  });

  page.drawText(accountPostCode, {
    x: margin,
    y: height - 510 - offset,
    size: fontSize.text,
  });
  page.drawText(accountCity, {
    x: margin,
    y: height - 530 - offset,
    size: fontSize.text,
  });
  page.drawText(accountCountry, {
    x: margin,
    y: height - 550 - offset,
    size: fontSize.text,
  });

  page.drawText(
    `This invoice is due by ${new Date(dueDate).toLocaleDateString()}`,
    {
      x: margin,
      y: height - 600 - offset,
      size: fontSize.text,
    }
  );
  const thankYouText = 'Thank you for your business!';
  const thankYouTextWidth = primaryFont.widthOfTextAtSize(thankYouText, 12);
  page.drawText(thankYouText, {
    x: width / 2 - thankYouTextWidth / 2,
    y: height - 650 - offset,
    size: 12,
  });

  if (paymentReceived) {
    page.drawText(
      `Payment received on ${new Date(paymentDate).toLocaleDateString()}`,
      {
        x: margin,
        y: 20,
        size: 12,
      }
    );
  }

  const pdfBytes = await document.save();
  return {
    pdfBytes,
  };
};
