import { ArrayApp } from './pages/ArrayApp';
import { AppHeader } from './cmps/AppHeader';
import { AppFooter } from './cmps/AppFooter';
import './assets/scss/main.scss';

export function App() {
  return (
    <div className='App'>
      <AppHeader />
      <main className='app-container'>
        <ArrayApp />
      </main>
      <AppFooter />
    </div>
  );
}
