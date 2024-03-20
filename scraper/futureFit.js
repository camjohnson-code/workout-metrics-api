import puppeteer from 'puppeteer';

const futureFitScraper = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.futurefit.co.uk/blog/gym-motivational-quotes/');

  await page.waitForSelector('.editorial-content.prose');

  const listItems = await page.$$eval(
    '.editorial-content.prose li',
    (elements) =>
      elements.map((el) => {
        const textContent = el.textContent;
        const parts = textContent.split('–');
        const quote = parts[0]
          .split('—')[0]
          .replaceAll('“', '')
          .replaceAll('”', '')
          .trim();
        const author = parts[1]
          ? parts[1]?.trim()
          : parts[0].split('—')[1]?.trim();
        const hasBeenUsed = false;
        const date = '2024-03-20';

        return {
          quote,
          author,
          hasBeenUsed,
          date,
        };
      })
  );

  console.log(listItems);
  await browser.close();
  return listItems;
};

futureFitScraper();

export default futureFitScraper;
