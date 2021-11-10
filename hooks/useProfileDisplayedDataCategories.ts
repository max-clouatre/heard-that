import { create } from 'zustand';
import { DISPLAY_CATEGORY_OPTIONS, DisplayCategoryOptions } from '../components/Layout';

type State = {
    selectedDisplayCategory: DisplayCategoryOptions;
    setSelectedDisplayCategory: (option: number) => void;
};

const useProfileDisplayedDataCategoryStore = create<State>((set) => ({
    selectedDisplayCategory: 0,
    increase: (by) => set((state) => ({ bears: state.bears + by }))
}));
