import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_USERS } from "../operations/queries";
import { DELETE_USER_AS_ADMIN } from "../operations/mutations";
import { Button, Modal, Stack } from "react-bootstrap";
import { User } from "../types/DBtypes";

interface AllUsersProps {
    show: boolean;
    handleClose: () => void;
}

const AllUsers: React.FC<AllUsersProps> = ({ show, handleClose }) => {
    const { loading, data, error } = useQuery(GET_ALL_USERS);
    const [deleteUser] = useMutation(DELETE_USER_AS_ADMIN);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const onDeleteUser = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await deleteUser({
                    variables: { id },
                    refetchQueries: [{ query: GET_ALL_USERS }], // Refetch all users after deletion
                });
                alert('User deleted successfully');
            } catch (error) {
                console.error('Error deleting user:', error);
                alert('Failed to delete user');
            }
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Users</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Stack gap={2}>
                    {data?.users.map((user: User) => (
                        <div key={user.id} className="d-flex justify-content-between align-items-center">
                            <span>{user.email}</span>
                            <Button onClick={() => onDeleteUser(user.id)} variant="outline-danger">&times;</Button>
                        </div>
                    ))}
                </Stack>
            </Modal.Body>
        </Modal>
    );
};

export default AllUsers;