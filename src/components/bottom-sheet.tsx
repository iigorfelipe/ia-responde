import React, { useEffect, useRef } from 'react';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

interface BottomSheetDemoProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  snapPoints?: string[];
}

export default function BottomSheetDemo({
  isOpen,
  onClose,
  children,
  snapPoints = ['3%', '10%', '40%'],
}: BottomSheetDemoProps) {
  const sheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    if (isOpen) {
      sheetRef.current?.expand();
    } else {
      sheetRef.current?.close();
    }
  }, [isOpen]);

  return (
    <BottomSheet ref={sheetRef} snapPoints={snapPoints} onClose={onClose}>
      <BottomSheetView>{children}</BottomSheetView>
    </BottomSheet>
  );
}
