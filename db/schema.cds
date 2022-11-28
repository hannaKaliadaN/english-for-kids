namespace sap.ui.english;

using {managed} from '@sap/cds/common';

entity Categories : managed {
  key ID       : Integer;
      title    : String(100);
      imageSrc : String;
      Words    : Association to many Words
                   on Words.Category = $self;
}

entity Words : managed {
  key ID          : Integer;
      word        : String;
      translation : String;
      imageSrc    : String;
      audioSrc    : String;
      Category    : Association to Categories;
}
