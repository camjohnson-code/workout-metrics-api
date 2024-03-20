import puppeteer from 'puppeteer';

const marathonHandbookScraper = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(
    'https://marathonhandbook.com/workout-quotes/#gym-motivational-quotes-that-will-have-you-pumping-iron-in-no-time'
  );

  await page.waitForSelector('.entry-content');

  const listItems = await page.$$eval('.entry-content ul li', (elements) =>
    elements.map((el) => {
      let parts = el.textContent.split('”');
      let quote, author;
      const hasBeenUsed = false;
      const date = '2024-03-20';

      if (parts[1]) {
        quote = parts[0].replace('“', '').trim();
        author = parts[1].replace(/[-–]/g, '').trim();
      } else {
        parts = parts[0].split('. ');
        quote = parts.slice(0, -1).join('. ').replace('“', '').trim();
        author = parts[parts.length - 1]
          ? parts[parts.length - 1].replace(/[-–]/g, '').trim()
          : undefined;
      }

      return {
        quote,
        author,
        hasBeenUsed,
        date,
      };
    })
  );

  console.log(listItems.slice(0, -3));
  await browser.close();
  return listItems.slice(0, -3);
};

marathonHandbookScraper();

export default marathonHandbookScraper;
