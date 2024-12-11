import { PDFDocument, rgb } from 'pdf-lib';
import { ResumeData } from '../lib/resumeData';

export const generateResumePDF = async (resumeData: ResumeData) => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 850]);
  const { height, width } = page.getSize();

  const font = await pdfDoc.embedFont('Helvetica');
  const boldFont = await pdfDoc.embedFont('Helvetica-Bold');
  const titleFont = await pdfDoc.embedFont('Helvetica-Bold');

  let currentY = height - 50;

  // Add a background color to the header area
  page.drawRectangle({
    x: 0,
    y: height - 100,
    width: width,
    height: 100,
    color: rgb(0.2, 0.4, 0.6), // Dark Blue background
  });

  // // Header - Profile Picture (Optional)
  // if (resumeData.profilePicture) {
  //   const imageBytes = await fetch(resumeData.profilePicture).then((res) => res.arrayBuffer());
  //   const image = await pdfDoc.embedJpg(imageBytes);
  //   const imageDims = image.scale(0.2);
  //   page.drawImage(image, {
  //     x: 50,
  //     y: height - 125,
  //     width: imageDims.width,
  //     height: imageDims.height,
  //   });
  // }

  // Header - Name and Contact Info
  page.drawText(resumeData.name, {
    x: 150,
    y: currentY,
    size: 24,
    font: titleFont,
    color: rgb(1, 1, 1), // White text
  });
  currentY -= 30;
  page.drawText(resumeData.email, {
    x: 150,
    y: currentY,
    size: 12,
    font,
    color: rgb(1, 1, 1),
  });
  currentY -= 20;

  if (resumeData.phone) {
    page.drawText(`Phone: ${resumeData.phone}`, {
      x: 150,
      y: currentY,
      size: 12,
      font,
      color: rgb(1, 1, 1),
    });
    currentY -= 20;
  }
  if (resumeData.address) {
    page.drawText(`Address: ${resumeData.address}`, {
      x: 150,
      y: currentY,
      size: 12,
      font,
      color: rgb(1, 1, 1),
    });
    currentY -= 20;
  }

  // Add a decorative line after the header section
  page.drawLine({
    start: { x: 50, y: currentY },
    end: { x: width - 50, y: currentY },
    color: rgb(1, 1, 1),
    thickness: 1,
});
  currentY -= 20;

  // Summary Section with a Box
  if (resumeData.summary) {
    page.drawText('Summary:', {
      x: 50,
      y: currentY,
      size: 14,
      font: boldFont,
      color: rgb(0.1, 0.1, 0.1),
    });
    currentY -= 20;

    // Box around the summary text
    page.drawRectangle({
      x: 50,
      y: currentY,
      width: width - 100,
      height: 80,
      color: rgb(0.95, 0.95, 0.95),
      borderWidth: 1,
      borderColor: rgb(0.1, 0.1, 0.1),
    });
    page.drawText(resumeData.summary, {
      x: 55,
      y: currentY + 50,
      size: 12,
      font,
      color: rgb(0.1, 0.1, 0.1),
    });

    currentY -= 100; // Space after summary box
  }

  // Experience Section with Decorative Header
  page.drawText('Experience:', {
    x: 50,
    y: currentY,
    size: 14,
    font: boldFont,
    color: rgb(0.1, 0.1, 0.1),
  });
  currentY -= 20;
  for (const exp of resumeData.experience) {
    page.drawText(`${exp.jobTitle} at ${exp.company}`, {
      x: 50,
      y: currentY,
      size: 12,
      font,
      color: rgb(0.1, 0.1, 0.1),
    });
    currentY -= 15;
    page.drawText(`From: ${exp.startDate} To: ${exp.endDate}`, {
      x: 50,
      y: currentY,
      size: 12,
      font,
      color: rgb(0.1, 0.1, 0.1),
    });
    currentY -= 15;
    page.drawText(`Description: ${exp.description}`, {
      x: 50,
      y: currentY,
      size: 12,
      font,
      color: rgb(0.1, 0.1, 0.1),
    });
    currentY -= 25;
  }

  // Add a line after the Experience section
  page.drawLine({
    start: { x: 50, y: currentY },
    end: { x: width - 50, y: currentY },
    color: rgb(0.1, 0.1, 0.1),
    thickness: 1,
  });
  currentY -= 20;

  // Education Section with Decorative Header
  page.drawText('Education:', {
    x: 50,
    y: currentY,
    size: 14,
    font: boldFont,
    color: rgb(0.1, 0.1, 0.1),
  });
  currentY -= 20;
  for (const edu of resumeData.education) {
    page.drawText(`${edu.degree} at ${edu.institution}`, {
      x: 50,
      y: currentY,
      size: 12,
      font,
      color: rgb(0.1, 0.1, 0.1),
    });
    currentY -= 15;
    page.drawText(`From: ${edu.startDate} To: ${edu.endDate}`, {
      x: 50,
      y: currentY,
      size: 12,
      font,
      color: rgb(0.1, 0.1, 0.1),
    });
    currentY -= 15;
    page.drawText(`Description: ${edu.description}`, {
      x: 50,
      y: currentY,
      size: 12,
      font,
      color: rgb(0.1, 0.1, 0.1),
    });
    currentY -= 25;
  }

  // Add a line after the Education section
  page.drawLine({
    start: { x: 50, y: currentY },
    end: { x: width - 50, y: currentY },
    color: rgb(0.1, 0.1, 0.1),
    thickness: 1,
  });
  currentY -= 20;
  

  // Skills Section as Progress Bars
  page.drawText('Skills:', {
    x: 50,
    y: currentY,
    size: 14,
    font: boldFont,
    color: rgb(0.1, 0.1, 0.1),
  });
  currentY -= 20;
  for (const skill of resumeData.skills) {
    page.drawText(`${skill.name}:`, {
      x: 50,
      y: currentY,
      size: 12,
      font,
      color: rgb(0.1, 0.1, 0.1),
    });
    currentY -= 10;

    // Draw a progress bar for skill level of 1-5
    const progressWidth = (parseInt(skill.level) / 5) * (width - 100);
    page.drawRectangle({
      x: 50,
      y: currentY,
      width: progressWidth,
      height: 10,
      color: rgb(0.1, 0.1, 0.1),
      borderWidth: 1,
      borderColor: rgb(0.1, 0.1, 0.1),
    });

    page.drawText(`${skill.level}/5`, {
      x: width - 50,
      y: currentY,
      size: 12,
      font,
      color: rgb(0.1, 0.1, 0.1),
    });

    currentY -= 20;
  }

  // Optional Projects Section
  if (resumeData.projects && resumeData.projects.length > 0) {
    page.drawText('Projects:', {
      x: 50,
      y: currentY,
      size: 14,
      font: boldFont,
      color: rgb(0.1, 0.1, 0.1),
    });
    currentY -= 20;
    for (const project of resumeData.projects) {
      page.drawText(`${project.title}`, {
        x: 50,
        y: currentY,
        size: 12,
        font,
        color: rgb(0.1, 0.1, 0.1),
      });
      currentY -= 15;
      page.drawText(`Description: ${project.description}`, {
        x: 50,
        y: currentY,
        size: 12,
        font,
        color: rgb(0.1, 0.1, 0.1),
      });
      currentY -= 15;
      if (project.url) {
        page.drawText(`URL: ${project.url}`, {
          x: 50,
          y: currentY,
          size: 12,
          font,
          color: rgb(0.1, 0.1, 0.1),
        });
        currentY -= 15;
      }
      page.drawText(`Technologies: ${project.technologies.join(', ')}`, {
        x: 50,
        y: currentY,
        size: 12,
        font,
        color: rgb(0.1, 0.1, 0.1),
      });
      currentY -= 25;
    }
  }

  // Save the PDF document
  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
};
