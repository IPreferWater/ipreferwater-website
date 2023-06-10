const LABEL_DAYS = [
  {
    "EN": "monday",
    "FR": "lundi"
    },
    {
      "EN": "tuesday",
      "FR": "mardi"
    },
    {
      "EN": "wednesday",
      "FR": "mercredi"
    },
    {
      "EN": "thursday",
      "FR": "jeudi"
    },
    {
      "EN": "friday",
      "FR": "vendredi"
    },
    {
      "EN": "saturday",
      "FR": "samedi"
    },
    {
      "EN": "sunday",
      "FR": "dimanche"
    }
  ]
  
  type LabelKey = {
    EN: string;
    FR: string;
  };
  
  export function getLabelDayByLanguage(index:number, language :string) :string{
    if (index <1 || index-1>LABEL_DAYS.length) {
      return "day label error"
    }
    const labelKey: LabelKey = LABEL_DAYS[index - 1];
    return labelKey[language as keyof LabelKey];
  }
  
  