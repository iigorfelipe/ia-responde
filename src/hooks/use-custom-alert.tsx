import React, { useState } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { DrawerParamList } from '../types/question';

type CustomAlertOptions = {
  title: string;
  message: string;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
};

export function useCustomAlert() {
  const [isVisible, setIsVisible] = useState(false);
  const [alertOptions, setAlertOptions] = useState<CustomAlertOptions | null>(null);
  const { navigate } = useNavigation<NavigationProp<DrawerParamList>>();

  const showAlert = (options: CustomAlertOptions) => {
    setAlertOptions(options);
    setIsVisible(true);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  const CustomAlert = () => {
    if (!alertOptions) return null;

    return (
      <Modal transparent visible={isVisible} animationType="fade">
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white rounded-2xl p-6 w-80">
            <Text className="text-lg font-bold mb-4">{alertOptions.title}</Text>
            <Text className="text-base text-gray-700 mb-6">{alertOptions.message}</Text>
            <View className="flex-row justify-end gap-3">
              <TouchableOpacity onPress={handleClose} className="px-4 py-2 rounded-2xl bg-secondary">
                <Text className="text-base text-primary">{alertOptions.cancelText || 'Cancelar'}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  handleClose();
                  alertOptions.onConfirm();
                }}
                className="px-4 py-2 rounded-2xl bg-red-500"
              >
                <Text className="text-white text-base">{alertOptions.confirmText || 'Excluir'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return { showAlert, CustomAlert, navigate };
}
