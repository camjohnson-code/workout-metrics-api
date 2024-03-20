import puppeteer from 'puppeteer';

const pelotonScraper = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.onepeloton.com/blog/workout-quotes/');

  await page.waitForSelector('.sc-ac0ebb10-9.jsDPWs');

  const listItems = await page.$$eval('.sc-ac0ebb10-9.jsDPWs li', (elements) =>
    elements.map((el) => {
      const textContent = el.textContent;
      const parts = textContent.split('—');
      const quote = parts[0].replaceAll('“', '').replaceAll('”', '').trim();
      const author = parts[1].trim();
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
};

pelotonScraper();

export default pelotonScraper;
