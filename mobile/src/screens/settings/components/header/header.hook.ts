import { useNavigation } from '@react-navigation/native';

export const useHeader = () => {
  const navigation = useNavigation();

  return {
    goBack: () => navigation.goBack(),
  };
};
