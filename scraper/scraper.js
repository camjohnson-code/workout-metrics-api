import fetch from 'node-fetch';
import pelotonScraper from './peloton.js';
import marathonHandbookScraper from './marathonHandbook.js';
import healthCoachInstituteScraper from './healthCoachInstitute.js';
import futureFitScraper from './futureFit.js';

const scraper = async () => {
  const results = [];
  results.push(await pelotonScraper());
  results.push(await marathonHandbookScraper());
  results.push(await healthCoachInstituteScraper());
  results.push(await futureFitScraper());

  const flattenedResults = results.flat();

  const uniqueResults = flattenedResults.filter(
    (object, index, array) =>
      object &&
      array.findIndex(
        (currentElement) =>
          currentElement && currentElement.quote === object.quote
      ) === index
  );

for (const result of uniqueResults) {
    try {
        const response = await fetch(
            'https://mysterious-springs-27042-d1832f763316.herokuapp.com/api/v1/quote',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(result),
            }
        );

        if (!response.ok) {
            const responseBody = await response.json();
            console.error(
                `Failed to post quote: ${response.status} ${
                    response.statusText
                }, ${JSON.stringify(responseBody)}`
            );
        } else {
            console.log(`Posted quote: ${result.quote}`);
        }
    } catch (error) {
        console.error(`Failed to post quote: ${error.message}`);
    }
}
};

scraper();
