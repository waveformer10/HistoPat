export type ListCardProps = {
  username: string;
  userRole: string;

  editAction?: string | (() => void);
  deleteAction?: string | (() => void);
};