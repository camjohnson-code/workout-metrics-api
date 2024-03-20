import puppeteer from 'puppeteer';

const healthCoachInstituteScraper = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.healthcoachinstitute.com/articles/24-workout-motivational-quotes/');

  await page.waitForSelector('.wp-block-column.post-body');

  const listItems = await page.$$eval('.wp-block-column.post-body li', (elements) =>
    elements.map((el) => {
      const textContent = el.textContent;
      const parts = textContent.split('—');
      const quote = parts[0].split('—')[0].replaceAll('“', '').replaceAll('”', '').replaceAll('"', '').replaceAll('"', '').trim();
      const author = parts[1]?.trim();
      const hasBeenUsed = false;
      const date = '2024-03-20';

      return {
        quote,
        author,
        hasBeenUsed,
        date,
      }
    })
  );

  console.log(listItems.slice(0, -5));

  await browser.close();
  return listItems.slice(0, -5);
};

healthCoachInstituteScraper();

export default healthCoachInstituteScraper;