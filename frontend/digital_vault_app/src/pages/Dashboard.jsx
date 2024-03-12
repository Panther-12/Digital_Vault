import { useState } from 'react';
import NavBar from "../components/NavBar";
import SearchCardTab from '../components/SearchCardTab';
import AddCard from '../components/AddCard';
import CardCategories from '../components/CardCategories';
import ViewCards from '../components/ViewCards';
import RenewalAlerts from '../components/RenewalAlerts'; // Import the RenewalAlerts component

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState('addCard');

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const renderContent = () => {
    switch (selectedTab) {
      case 'addCard':
        return (
          <AddCard/>
        );
      case 'cardsByUser':
        return (
          <ViewCards/>
        );
      case 'cardsByType':
        return (
          <CardCategories/>
        );
      case 'searchCards':
        return (
          <SearchCardTab/>
        );
      case 'renewalAlerts':
        return (
          <RenewalAlerts/>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full flex flex-col">
      <NavBar />
      <div className="flex">
        <div className="w-1/4 bg-gray-200">
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">Dashboard Tabs</h3>
            <ul>
              <li className={`cursor-pointer mb-2 ${selectedTab === 'addCard' && 'font-bold'}`} onClick={() => handleTabClick('addCard')}>Add Card</li>
              <li className={`cursor-pointer mb-2 ${selectedTab === 'cardsByUser' && 'font-bold'}`} onClick={() => handleTabClick('cardsByUser')}>View Cards</li>
              <li className={`cursor-pointer mb-2 ${selectedTab === 'cardsByType' && 'font-bold'}`} onClick={() => handleTabClick('cardsByType')}>Cards By Type</li>
              <li className={`cursor-pointer mb-2 ${selectedTab === 'searchCards' && 'font-bold'}`} onClick={() => handleTabClick('searchCards')}>Search Cards</li>
              <div className="flex flex-row items-center">
                <li className={`cursor-pointer mb-2 ${selectedTab === 'renewalAlerts' && 'font-bold'}`} onClick={() => handleTabClick('renewalAlerts')}>
                  Renewal Alerts
                </li>
                <div className="inline-flex items-center justify-center w-6 h-6 ml-2 text-xs font-bold text-white bg-red-500 rounded-full">
                  2
                </div>
              </div>
            </ul>
          </div>
        </div>
        <div className="w-3/4 bg-white">
          <div className="p-4">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
