import { Controller } from 'react-hook-form';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dropdown } from '@/components/ui/dropdown';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { usePressAnimation } from '@/hooks';
import { AddCategoryModal } from '@/screens/finance/components/add-category-modal';
import { DeleteCustomCategoryModal } from '@/screens/finance/components/delete-custom-category-modal';
import { SelectDateModal } from '@/screens/finance/components/select-date-modal';
import { Currency } from '@/screens/finance/currency.constants';
import { CategoryType, TransactionType } from '@/screens/finance/finance.types';

import { useAddTransactionCard } from './add-transaction-card.hook';
import { styles } from './add-transaction-card.styles';

export const AddTransactionCard = () => {
  const {
    t,
    control,
    isValid,
    error,
    transactionType,
    currency,
    setCurrency,
    selectedDate,
    setSelectedDate,
    isDatePickerVisible,
    setIsDatePickerVisible,
    category,
    setCategory,
    dropdownCategories,
    customCategories,
    isAddCategoryModalVisible,
    setIsAddCategoryModalVisible,
    isDeleteCategoryModalVisible,
    setIsDeleteCategoryModalVisible,
    handleDeleteCategory,
    currencyOptions,
    transactionTypes,
    handleTypeChange,
    onAddTransactionPress,
    formatedDate,
  } = useAddTransactionCard();
  const { pressHandlers, animatedStyle } = usePressAnimation({
    activeScale: 0.96,
  });
  return (
    <Card>
      <View style={styles.newTransactionCardContent}>
        <Text variant="h3" colorType="main">
          {t('Finance.headerText')}
        </Text>

        {!!error && <Text style={styles.error}>{t(error)}</Text>}

        <View style={styles.formContainer}>
          <Dropdown
            style={styles.transactionType}
            data={transactionTypes}
            value={transactionType}
            onSelect={val => handleTypeChange(val as TransactionType)}
          />

          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder={t('Finance.description')}
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
              />
            )}
          />

          <View style={styles.inputsRow}>
            <Controller
              control={control}
              name="amount"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder={t('Finance.amount')}
                  value={value === null ? '' : value.toString()}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  keyboardType="numeric"
                  style={styles.amountInput}
                />
              )}
            />
          </View>
          <View style={styles.categoryRow}>
            <Dropdown
              data={dropdownCategories}
              value={category}
              onSelect={val => setCategory(val as CategoryType)}
              style={styles.categoryDropdown}
            />
            <View style={styles.categoryButtonsContainer}>
              <Button
                title="−"
                onPress={() => setIsDeleteCategoryModalVisible(true)}
                style={styles.actionButton}
              />
              <Button
                title="+"
                onPress={() => setIsAddCategoryModalVisible(true)}
                style={styles.actionButton}
              />
            </View>
          </View>

          <AddCategoryModal
            visible={isAddCategoryModalVisible}
            onClose={() => setIsAddCategoryModalVisible(false)}
            transactionType={transactionType}
            onCategoryCreated={newId => setCategory(newId)}
          />

          <DeleteCustomCategoryModal
            visible={isDeleteCategoryModalVisible}
            customCategories={customCategories}
            onDelete={handleDeleteCategory}
            onClose={() => setIsDeleteCategoryModalVisible(false)}
          />
          <View style={styles.dateRow}>
            <Button
              title={t('Finance.transaction_date') + '\n ' + formatedDate}
              onPress={() => setIsDatePickerVisible(true)}
              variant="outline"
              style={styles.dateButton}
            />
            <Dropdown
              data={currencyOptions}
              value={currency}
              onSelect={val => setCurrency(val as Currency)}
              style={styles.currencyDropdown}
            />
          </View>

          <SelectDateModal
            visible={isDatePickerVisible}
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
            onClose={() => setIsDatePickerVisible(false)}
          />
          <Animated.View style={animatedStyle}>
            <Button
              {...pressHandlers}
              title={t('Finance.buttonText')}
              onPress={() => onAddTransactionPress(category)}
              disabled={
                !isValid ||
                !selectedDate.trim() ||
                !category.trim() ||
                !currency.trim()
              }
              style={styles.addButton}
            />
          </Animated.View>
        </View>
      </View>
    </Card>
  );
};
