import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';

const DeleteConfirmDialog = ({ open, onClose, onConfirm, customerName }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="delete-dialog-title"
      aria-describedby="delete-dialog-description"
    >
      <DialogTitle id="delete-dialog-title">
        顧客情報の削除
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="delete-dialog-description">
          {customerName} さんの顧客情報を削除してもよろしいですか？
          この操作は取り消すことができません。
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          キャンセル
        </Button>
        <Button onClick={onConfirm} color="error" variant="contained" autoFocus>
          削除
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmDialog; 