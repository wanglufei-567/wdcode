import { createNotesModule } from '@wdcode/notes'
import { createWorksShowcaseModule } from '@wdcode/works-showcase'

import { SiteFooter } from '../components/SiteFooter'
import { SiteHeader } from '../components/SiteHeader'
import { createSiteModuleRegistry } from './createSiteModuleRegistry'

const siteChrome = {
  Header: SiteHeader,
  Footer: SiteFooter,
}

export const siteRegistry = createSiteModuleRegistry(
  [createNotesModule(siteChrome), createWorksShowcaseModule(siteChrome)],
  [{ label: '首页', path: '/', order: 10, end: true }],
)
