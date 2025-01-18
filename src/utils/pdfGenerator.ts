import { PDFDocument, rgb } from "pdf-lib";
import { ResumeData } from "../lib/resumeData";

export const generateResumePDF = async (resumeData: ResumeData) => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();
  const { height, width } = page.getSize();
  const font = await pdfDoc.embedFont("Helvetica");
  const boldFont = await pdfDoc.embedFont("Helvetica-Bold");
  const titleFont = await pdfDoc.embedFont("Helvetica-Bold");

  let currentY = height - 28 - 16;

  // Add a background color to the header area
  page.drawRectangle({
    x: 0,
    y: height - 78,
    width: width,
    height: 78,
    color: rgb(0.2, 0.2, 0.2), // Dark Gray background
  });

  // Header - Name and Contact Info
  page.drawText(resumeData.name, {
    x: 16,
    y: currentY,
    size: 28,
    font,
    color: rgb(1, 1, 1), // White text
  });
  currentY -= 18;

  page.drawText(resumeData.email, {
    x: 16,
    y: currentY,
    size: 10,
    font,
    color: rgb(1, 1, 1),
  });
  currentY -= 42;

  // if (resumeData.phone) {
  //   page.drawText(`Phone: ${resumeData.phone}`, {
  //     x: 150,
  //     y: currentY,
  //     size: 12,
  //     font,
  //     color: rgb(1, 1, 1),
  //   });
  //   currentY -= 20;
  // }
  // if (resumeData.address) {
  //   page.drawText(`Address: ${resumeData.address}`, {
  //     x: 150,
  //     y: currentY,
  //     size: 12,
  //     font,
  //     color: rgb(1, 1, 1),
  //   });
  //   currentY -= 20;
  // }

  // Add a decorative line after the header section

  // page.drawLine({
  //   start: { x: 50, y: currentY },
  //   end: { x: width - 50, y: currentY },
  //   color: rgb(1, 1, 1),
  //   thickness: 1,
  // });
  // currentY -= 20;

  // // Summary Section with a Box
  // if (resumeData.summary) {
  //   page.drawText("Summary:", {
  //     x: 50,
  //     y: currentY,
  //     size: 14,
  //     font: boldFont,
  //     color: rgb(0.1, 0.1, 0.1),
  //   });
  //   currentY -= 20;

  //   // Box around the summary text
  //   page.drawRectangle({
  //     x: 50,
  //     y: currentY,
  //     width: width - 100,
  //     height: 80,
  //     color: rgb(0.95, 0.95, 0.95),
  //     borderWidth: 1,
  //     borderColor: rgb(0.1, 0.1, 0.1),
  //   });
  //   page.drawText(resumeData.summary, {
  //     x: 55,
  //     y: currentY + 50,
  //     size: 12,
  //     font,
  //     color: rgb(0.1, 0.1, 0.1),
  //   });

  //   currentY -= 100; // Space after summary box
  // }

  // Experience Section with Decorative Header
  page.drawText("EXPERIENCE:", {
    x: 16,
    y: currentY,
    size: 12,
    font: boldFont,
    color: rgb(0.1, 0.1, 0.1),
  });
  currentY -= 20;

  for (const exp of resumeData.experience) {
    page.drawText(exp.jobTitle, {
      x: 32,
      y: currentY,
      size: 10,
      font: boldFont, // Bold font for job title
      color: rgb(0.1, 0.1, 0.1),
    });
    const jobTitleWidth = boldFont.widthOfTextAtSize(exp.jobTitle, 10); // Calculate the width of job title text
    page.drawText(` at `, {
      x: 32 + jobTitleWidth,
      y: currentY,
      size: 10,
      font, // Bold font for company name
      color: rgb(0.1, 0.1, 0.1),
    });
    const companyNameWidth = font.widthOfTextAtSize(` at `, 10);
    page.drawText(exp.company, {
      x: 32 + companyNameWidth + jobTitleWidth,
      y: currentY,
      size: 10,
      font: boldFont,
      color: rgb(0.1, 0.1, 0.1),
    });
    currentY -= 14;

    page.drawText(`${exp.startDate} to ${exp.endDate}`, {
      x: 32,
      y: currentY,
      size: 10,
      font,
      color: rgb(0.1, 0.1, 0.1),
    });
    currentY -= 14;

    currentY -= 8;
  }

  // Add a line after the Experience section
  page.drawLine({
    start: { x: 16, y: currentY },
    end: { x: width - 16, y: currentY },
    color: rgb(0.1, 0.1, 0.1),
    thickness: 1,
  });
  currentY -= 25;

  // Education Section with Decorative Header
  page.drawText("EDUCATION:", {
    x: 16,
    y: currentY,
    size: 12,
    font: boldFont,
    color: rgb(0.1, 0.1, 0.1),
  });
  currentY -= 20;

  for (const edu of resumeData.education) {
    // Draw the degree in bold
    page.drawText(edu.degree, {
      x: 32,
      y: currentY,
      size: 10,
      font: boldFont, // Bold font for the degree
      color: rgb(0.1, 0.1, 0.1),
    });
    // Calculate the width of the degree text
    const degreeWidth = boldFont.widthOfTextAtSize(edu.degree, 10);
    // Draw " at " in regular font
    page.drawText(" at ", {
      x: 32 + degreeWidth,
      y: currentY,
      size: 10,
      font, // Regular font for " at "
      color: rgb(0.1, 0.1, 0.1),
    });

    // Calculate the width of " at " text
    const atWidth = font.widthOfTextAtSize(" at ", 10);

    // Draw the institution in bold
    page.drawText(edu.institution, {
      x: 32 + degreeWidth + atWidth,
      y: currentY,
      size: 10,
      font: boldFont, // Bold font for the institution
      color: rgb(0.1, 0.1, 0.1),
    });
    currentY -= 14;

    page.drawText(`${edu.startDate} to ${edu.endDate}`, {
      x: 32,
      y: currentY,
      size: 10,
      font,
      color: rgb(0.1, 0.1, 0.1),
    });
    currentY -= 14;

    currentY -= 8;
  }

  // Add a line after the Education section
  page.drawLine({
    start: { x: 16, y: currentY },
    end: { x: width - 16, y: currentY },
    color: rgb(0.1, 0.1, 0.1),
    thickness: 1,
  });
  currentY -= 25;

  // Skills Section as Progress Bars
  page.drawText("SKILLS:", {
    x: 16,
    y: currentY,
    size: 12,
    font: boldFont,
    color: rgb(0.1, 0.1, 0.1),
  });
  currentY -= 20;

  for (const skill of resumeData.skills) {
    page.drawText(`${skill.name}:`, {
      x: 32,
      y: currentY,
      size: 10,
      font,
      color: rgb(0.1, 0.1, 0.1),
    });
    currentY -= 10;

    // Draw a progress bar for skill level of 1-5
    const progressWidth = (parseInt(skill.level) / 5) * (width - 64);
    const progressTextWidth = font.widthOfTextAtSize(`${skill.level}/5`, 10);
    page.drawRectangle({
      x: 32,
      y: currentY,
      width: progressWidth - progressTextWidth - 8,
      height: 5,
      color: rgb(0.1, 0.1, 0.1),
      borderWidth: 1,
      borderColor: rgb(0.1, 0.1, 0.1),
    });

    page.drawText(`${skill.level}/5`, {
      x: width - 32 - progressTextWidth,
      y: currentY,
      size: 10,
      font,
      color: rgb(0.1, 0.1, 0.1),
    });

    currentY -= 14;
  }

  // // Optional Projects Section
  // if (resumeData.projects && resumeData.projects.length > 0) {
  //   page.drawText("Projects:", {
  //     x: 50,
  //     y: currentY,
  //     size: 14,
  //     font: boldFont,
  //     color: rgb(0.1, 0.1, 0.1),
  //   });
  //   currentY -= 20;
  //   for (const project of resumeData.projects) {
  //     page.drawText(`${project.title}`, {
  //       x: 50,
  //       y: currentY,
  //       size: 12,
  //       font,
  //       color: rgb(0.1, 0.1, 0.1),
  //     });
  //     currentY -= 15;
  //     page.drawText(`Description: ${project.description}`, {
  //       x: 50,
  //       y: currentY,
  //       size: 12,
  //       font,
  //       color: rgb(0.1, 0.1, 0.1),
  //     });
  //     currentY -= 15;
  //     if (project.url) {
  //       page.drawText(`URL: ${project.url}`, {
  //         x: 50,
  //         y: currentY,
  //         size: 12,
  //         font,
  //         color: rgb(0.1, 0.1, 0.1),
  //       });
  //       currentY -= 15;
  //     }
  //     page.drawText(`Technologies: ${project.technologies.join(", ")}`, {
  //       x: 50,
  //       y: currentY,
  //       size: 12,
  //       font,
  //       color: rgb(0.1, 0.1, 0.1),
  //     });
  //     currentY -= 25;
  //   }
  // }

  // Save the PDF document
  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
};
