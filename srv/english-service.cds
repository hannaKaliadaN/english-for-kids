using { sap.ui.english as my } from '../db/schema';
@path: 'service/english'
service EnglishService {
  entity Words as projection on my.Words;
 
  entity Categories as projection on my.Categories;
  
}
