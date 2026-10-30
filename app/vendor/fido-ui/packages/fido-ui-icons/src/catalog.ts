import type { IconComponent } from './create-icon';
import * as CommerceIcons from './commerce/index';
import * as PetsIcons from './pets/index';
import * as FilesIcons from './files/index';
import * as MapsTravelBusinessIcons from './maps-travel-business/index';
import * as OutdoorsIcons from './outdoors/index';
import * as CommunicationIcons from './communication/index';
import * as DevicesIcons from './devices/index';
import * as MediaIcons from './media/index';
import * as TextStylingIcons from './text-styling/index';
import * as UtilityIcons from './utility/index';
import * as PeopleIcons from './people/index';
import * as ArrowsIcons from './arrows/index';
import * as FinanceIcons from './finance/index';
import * as DevelopmentIcons from './development/index';
import * as SecurityIcons from './security/index';
import * as EducationIcons from './education/index';
import * as ChartsIcons from './charts/index';
import * as TimeDateIcons from './time-date/index';
import * as MeasurementIcons from './measurement/index';
import * as SearchIcons from './search/index';
import * as PaymentMethodsIcons from './payment-methods/index';

export interface IconCatalogCategory {
  name: string;
  slug: string;
  icons: Record<string, IconComponent>;
}

export const iconCategories: IconCatalogCategory[] = [
  { name: 'Commerce', slug: 'commerce', icons: CommerceIcons },
  { name: 'Pets', slug: 'pets', icons: PetsIcons },
  { name: 'Files', slug: 'files', icons: FilesIcons },
  { name: 'Maps-Travel-Business', slug: 'maps-travel-business', icons: MapsTravelBusinessIcons },
  { name: 'Outdoors', slug: 'outdoors', icons: OutdoorsIcons },
  { name: 'Communication', slug: 'communication', icons: CommunicationIcons },
  { name: 'Devices', slug: 'devices', icons: DevicesIcons },
  { name: 'Media', slug: 'media', icons: MediaIcons },
  { name: 'Text Styling', slug: 'text-styling', icons: TextStylingIcons },
  { name: 'Utility', slug: 'utility', icons: UtilityIcons },
  { name: 'People', slug: 'people', icons: PeopleIcons },
  { name: 'Arrows', slug: 'arrows', icons: ArrowsIcons },
  { name: 'Finance', slug: 'finance', icons: FinanceIcons },
  { name: 'Development', slug: 'development', icons: DevelopmentIcons },
  { name: 'Security', slug: 'security', icons: SecurityIcons },
  { name: 'Education', slug: 'education', icons: EducationIcons },
  { name: 'Charts', slug: 'charts', icons: ChartsIcons },
  { name: 'Time-Date', slug: 'time-date', icons: TimeDateIcons },
  { name: 'Measurement', slug: 'measurement', icons: MeasurementIcons },
  { name: 'Search', slug: 'search', icons: SearchIcons },
  { name: 'Payment Method Icon', slug: 'payment-methods', icons: PaymentMethodsIcons },
];

export const iconCount = 515;
