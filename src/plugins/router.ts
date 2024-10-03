import { createMemoryHistory, createRouter } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import InvoiceView from '../views/InvoiceView.vue'
import AllInvoiceView from '../views/AllInvoiceView.vue'
import SuggestionView from '../views/SuggestionView.vue'

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/invoice', name: 'Invoice', component: InvoiceView },
  { path: '/allinvoice', name: 'AllInvoice', component: AllInvoiceView },
  { path: '/suggestion', name: 'Suggestion', component: SuggestionView }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router;
