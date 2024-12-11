import { PDFDocument, rgb } from 'pdf-lib';
import { ResumeData } from '../lib/resumeData';

export const generateResumePDF = async (resumeData: ResumeData) => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 850]); // Adjust page size for a nicer layout
  const { height, width } = page.getSize();

  const font = await pdfDoc.embedFont('Helvetica');
  const boldFont = await pdfDoc.embedFont('Helvetica-Bold');

  let currentY = height - 50; // Starting Y position for text

  // Add a border for a clean look
  page.drawRectangle({
    x: 0,
    y: 0,
    width: width,
    height: height,
    borderColor: rgb(0, 0, 0),
    borderWidth: 2,
    opacity: 0.05,
  });

  // Header Section - Name and Contact Information
  page.drawText(resumeData.name, { x: 50, y: currentY, size: 20, font: boldFont });
  currentY -= 30;
  page.drawText(resumeData.email, { x: 50, y: currentY, size: 12, font });
  currentY -= 20;

  // Optional phone and address
  if (resumeData.phone) {
    page.drawText(`Phone: ${resumeData.phone}`, { x: 50, y: currentY, size: 12, font });
    currentY -= 20;
  }
  if (resumeData.address) {
    page.drawText(`Address: ${resumeData.address}`, { x: 50, y: currentY, size: 12, font });
    currentY -= 20;
  }

  // Draw a horizontal line after contact information
  page.drawLine({
    start: { x: 50, y: currentY },
    end: { x: width - 50, y: currentY },
    color: rgb(0, 0, 0),
    thickness: 1,
  });
  currentY -= 20;

  // Summary Section
  if (resumeData.summary) {
    page.drawText('Summary:', { x: 50, y: currentY, size: 14, font: boldFont });
    currentY -= 20;
    page.drawText(resumeData.summary, { x: 50, y: currentY, size: 12, font });
    currentY -= 40; // Space after summary
  }

  // Experience Section
  page.drawText('Experience:', { x: 50, y: currentY, size: 14, font: boldFont });
  currentY -= 20;
  for (const exp of resumeData.experience) {
    page.drawText(`${exp.jobTitle} at ${exp.company}`, { x: 50, y: currentY, size: 12, font });
    currentY -= 15;
    page.drawText(`From: ${exp.startDate} To: ${exp.endDate}`, { x: 50, y: currentY, size: 12, font });
    currentY -= 15;
    page.drawText(`Description: ${exp.description}`, { x: 50, y: currentY, size: 12, font });
    currentY -= 25;
  }

  // Draw a line after Experience section
  page.drawLine({
    start: { x: 50, y: currentY },
    end: { x: width - 50, y: currentY },
    color: rgb(0, 0, 0),
    thickness: 1,
  });
  currentY -= 20;

  // Education Section
  page.drawText('Education:', { x: 50, y: currentY, size: 14, font: boldFont });
  currentY -= 20;
  for (const edu of resumeData.education) {
    page.drawText(`${edu.degree} at ${edu.institution}`, { x: 50, y: currentY, size: 12, font });
    currentY -= 15;
    page.drawText(`From: ${edu.startDate} To: ${edu.endDate}`, { x: 50, y: currentY, size: 12, font });
    currentY -= 15;
    page.drawText(`Description: ${edu.description}`, { x: 50, y: currentY, size: 12, font });
    currentY -= 25;
  }

  // Skills Section
  page.drawText('Skills:', { x: 50, y: currentY, size: 14, font: boldFont });
  currentY -= 20;
  for (const skill of resumeData.skills) {
    page.drawText(`${skill.name} (Level ${skill.level})`, { x: 50, y: currentY, size: 12, font });
    currentY -= 15;
  }

  // Optional Projects Section
  if (resumeData.projects && resumeData.projects.length > 0) {
    page.drawText('Projects:', { x: 50, y: currentY, size: 14, font: boldFont });
    currentY -= 20;
    for (const project of resumeData.projects) {
      page.drawText(`${project.title}`, { x: 50, y: currentY, size: 12, font });
      currentY -= 15;
      page.drawText(`Description: ${project.description}`, { x: 50, y: currentY, size: 12, font });
      currentY -= 15;
      if (project.url) {
        page.drawText(`URL: ${project.url}`, { x: 50, y: currentY, size: 12, font });
        currentY -= 15;
      }
      page.drawText(`Technologies: ${project.technologies.join(', ')}`, { x: 50, y: currentY, size: 12, font });
      currentY -= 25;
    }
  }

  // Optional Languages Section
  if (resumeData.languages && resumeData.languages.length > 0) {
    page.drawText('Languages:', { x: 50, y: currentY, size: 14, font: boldFont });
    currentY -= 20;
    for (const language of resumeData.languages) {
      page.drawText(`${language}`, { x: 50, y: currentY, size: 12, font });
      currentY -= 15;
    }
  }

  // Optional Certifications Section
  if (resumeData.certifications && resumeData.certifications.length > 0) {
    page.drawText('Certifications:', { x: 50, y: currentY, size: 14, font: boldFont });
    currentY -= 20;
    for (const certification of resumeData.certifications) {
      page.drawText(`${certification}`, { x: 50, y: currentY, size: 12, font });
      currentY -= 15;
    }
  }

  // Optional Hobbies Section
  if (resumeData.hobbies && resumeData.hobbies.length > 0) {
    page.drawText('Hobbies:', { x: 50, y: currentY, size: 14, font: boldFont });
    currentY -= 20;
    for (const hobby of resumeData.hobbies) {
      page.drawText(`${hobby}`, { x: 50, y: currentY, size: 12, font });
      currentY -= 15;
    }
  }

  // Ensure the content fits within the page
  if (currentY < 50) {
    pdfDoc.addPage([600, 850]);
    currentY = height - 50; // Reset the Y position to start from top for the new page
  }

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
};
