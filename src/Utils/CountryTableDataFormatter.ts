export interface COUNTRYDATA {
  name: string;
  countryCode: string;
  capital: string;
  capitalPopulation: number;
  Language: string;
  Currency: string;
  ID: number;
}

export interface COLUMN {
  label: string;
  accessor: string;
  sortable: boolean;
}

export interface COUNTRIESDATA {
  countries: COUNTRYDATA[];
}

export interface FORMATTEDCOUNTRIESDATA {
  rows: COUNTRYDATA[];
  columns: COLUMN[];
}

function formatData(data: any): FORMATTEDCOUNTRIESDATA {
  const rows = data.countries;
  let columns = [];

  for (let key in data.countries[0]) {
    columns.push({
      label: key,
      accessor: key,
      sortable: key === 'capitalPopulation' ? true : false
    });
  }

  return { rows, columns };
}

export default formatData;
