import { MetricType, Quality, type LogRecord, type Metric } from '$lib';
import type { DataStore } from './db';

class StaticDatabase implements DataStore {
   listMetrics() {
      return Promise.resolve(metrics);
   }

   putMetric(metric: Metric) {
      const i = metrics.findIndex((m) => m.key == metric.key);

      if (i >= 0) {
         metrics[i] = metric;
      } else {
         metrics.push(metric);
      }

      return Promise.resolve();
   }

   addLog(log: LogRecord) {
      records.push(log);
      return Promise.resolve();
   }

   updateLog(log: LogRecord) {
      const index = records.findIndex((l) => l.id == log.id);
      if (index < 0) {
         return Promise.reject();
      } else {
         records[index] = log;
         return Promise.resolve();
      }
   }

   deleteLog(id: number) {
      const index = records.findIndex((l) => l.id == id);
      if (index < 0) {
         return Promise.reject();
      } else {
         records.splice(index, 1);
         return Promise.resolve();
      }
   }

   listLogs(startTs: number, endTs: number) {
      const results = records
         .filter((x) => x.timestamp >= startTs && x.timestamp <= endTs);
      return Promise.resolve(results);
   }

   listRecentLogs(count: number, metricKey: string) {
      const results = records
         .filter((r) => r.metricKey == metricKey)
         .slice(0, count);
      return Promise.resolve(results);
   }

   getLog(id: number) {
      const result = records.find((x) => x.id == id);
      if (result) {
         return Promise.resolve(result);
      } else {
         return Promise.reject();
      }
   }
}

export function _openDb():Promise<DataStore> {
   return Promise.resolve(new StaticDatabase());
}

const records: LogRecord[] = [];

export const metrics: Metric[] = [
   {
      key: 'stool',
      label: 'Stool',
      icon: 'poop',
      order: 3,
      metricType: MetricType.Grouped,
      metrics: {
         type: {
            metricType: MetricType.SingleOption,
            options: [
               { label: 'Select stool type', value: undefined },
               { label: 'None', value: 0, quality: Quality.Bad },
               { label: 'Separate hard lumps', value: 1, quality: Quality.Bad },
               { label: 'Lumpy and sausage like', value: 2, quality: Quality.Neutral },
               { label: 'Sausage shaped with cracks', value: 3, quality: Quality.Good },
               { label: 'Smooth sausage shaped', value: 4, quality: Quality.Good },
               { label: 'Soft blobs clear cut edges', value: 5, quality: Quality.Neutral },
               { label: 'Mushy with ragged edges', value: 6, quality: Quality.Bad },
               { label: 'Liquid with no solids', value: 7, quality: Quality.Bad },
            ]
         },
         volume: {
            metricType: MetricType.SingleOption,
            options: [
               { label: 'Select volume', value: undefined },
               { label: 'Tiny', value: 0.1 },
               { label: 'Tiny Low', value: 0.5 },
               { label: 'Low', value: 1.0 },
               { label: 'Low Medium', value: 1.5 },
               { label: 'Medium', value: 2.0 },
               { label: 'Medium High', value: 2.5 },
               { label: 'High', value: 3.0 },
            ]
         }
      },
      tags: ['Mucus', 'Thin', 'Blood']
   },
   {
      key: 'sleep',
      label: 'Sleep',
      icon: 'moon',
      order: 2,
      metricType: MetricType.SingleOption,
      options: [
         { label: 'Select hours slept', value: undefined },
         { label: 'Hour or less', value: 1 },
         { label: '2 hours', value: 2 },
         { label: '3 hours', value: 3 },
         { label: '4 hours', value: 4 },
         { label: '5 hours', value: 5 },
         { label: '6 hours', value: 6 },
         { label: '7 hours', value: 7 },
         { label: '8 hours', value: 8 },
         { label: '9 hours', value: 9 },
         { label: 'More than 9 hours', value: 10 },
      ],
      tags: [
         'bad dream/nightmare',
         'toss & turn',
         'restless',
         'difficulty falling asleep',
         'tired after waking up',
         'waking up during sleep'
      ]
   },
   {
      key: 'food',
      label: 'Food',
      icon: 'carrot',
      order: 1,
      metricType: MetricType.Text,
      tags: ['Egg','Bread','Tomato','Guacamole','Yogurt (fruits)','Cereal','Banana','Orange','Salmon','Green beans','White rice','Shrimp','Carrots','Kimchi','Raspberry','Cheese (hard)','Bacon','Milk','Cucumber','Radish','Blueberry','Turkey','Mashed Potato','Gravy','Peas','Ham','Yogurt (plain)','Pasta','Cheese sauce','Seaweed','Tuna','Mayonnaise','Cheese spread','Tortilla chips','Cheese dip','Celery','Potatoes','Sausage','Edamame','Fries','Butter','English muffin','Lettuce','Butternut squash','Apple','Apple vinegar','Avocado','Spring onion','Onion','Corn','Ketchup','Brown rice','Beans','Beef','Snap peas','Broccoli','Hummus','Chicken','Bell pepper','Tortilla','Peanut butter','Gnocchi','Tomato sauce','Popcorn','Salsa','Tomato (canned)','Mushroom','Olive','Kale','Beetroot','Kiwi','Trout','Quinoa','Grapefruit','Oat milk','Leek','Cheese (soft)','Pie crust','Almond milk','Asparagus','Brussels sprout','Ranch dressing','Garlic','Grapes','Cream cheese','Pepperoni','Capers','Pancakes','Cauliflower','Coleslaw','Soy sauce','Oyster sauce','Ginger','Strawberry','Raisin','Pineapple','Walnut','Flour','Mustard','Pickles','Mango','Tempeh','Pork','Parsnip','Pear','Lemon','Mint','Blackberry','Chocolate milk','Jam','Mozzarella','Hot Dog (sausage, bun)','Sesame seeds','Cracker','Basil','Tomato (sundried)','Granola bar','Zucchini','Chips (potato)','Feta','Tomato (paste)','Sherbet','Cherry','Cantaloupe','Honeydew','Spinach','Croissant','Sour cream','Peach','Sweet potato','Ice cream','Barbecue sauce','Plum','Clarified butter','Brown sugar','Yogurt (lactose free)','Rice noodles','Psyllium husks','Bread (gluten free)','Pumpkin','Bagel','Cookie','Brown bread','Pretzels','Cashew','Cranberry','Cream','Sunflower seeds','tortilla (gluten free)','Orange juice','Alcohol','Cabbage','Lentils','Oats','Rice vinegar','Beer','Sugar','Vanilla','Chestnut','Coconut milk','Clementine','Honey','Curry (sauce)','Maple syrup','Almonds','Sourdough bread','Balsamic vinegar','Cornmeal','Garlic bread','Muffin','Tofu','Granola'],
      favourites: [
         { value: 'Toast and orange', tags: ['Brown bread', 'Orange', 'Peanut butter']},
         { value: 'Cereal and fruit', tags: ['Granola', 'Yogurt (plain)', 'Oat milk', 'Banana']}
      ],
      recent: 5
   },
   {
      key: 'medication',
      label: 'Medication',
      icon: 'medicine',
      order: 4,
      metricType: MetricType.NamedQuantity,
      units: [
         'capsule',
         'drop',
         'ml',
         'oz',
         'mg',
         'mcg',
         'pc',
         'pill',
         'scoop',
         'tsp',
         'tbsp'
      ],
      favourites: []
   },
   {
      key: 'notes',
      label: 'Notes',
      icon: 'book',
      order: 5,
      metricType: MetricType.Note
   }
];