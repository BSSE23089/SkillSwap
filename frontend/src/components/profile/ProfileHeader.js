import { Star, MapPin, Calendar, MessageCircle, Users, Edit3 } from "lucide-react";
import { useState } from "react";
import styles from "./ProfileHeader.module.css";
import Overlay from '../../UI/Overlay';
import Card from "../../UI/Card";
import Button from "../../UI/Button";
import Avatar from "../common/Avatar";
import Text from "../../UI/Text";
import EditDetailsForm from "../common/EditProfileForm";

const ProfileHeader = ({ user, onUserUpdate }) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleEditClick = () => {
    setIsEditDialogOpen(true);
  };

  const handleEditClose = () => {
    setIsEditDialogOpen(false);
  };

  const handleUserUpdate = (updatedUser) => {
    onUserUpdate(updatedUser);
    setIsEditDialogOpen(false);
  };

  return (
    <>
      <Card className={styles.container}>
        <div className={styles.content}>
          {/* Edit Icon */}
          <Button 
            className={styles.editIcon} 
            onClick={handleEditClick}
            aria-label="Edit profile"
          >
            <Edit3 className="w-5 h-5" />
          </Button>

          <div className={styles.avatar}>
            <Avatar
              url={user.avatarUrl}
              size={80}
              name={user.name}
              className={styles.avatarCircle}
            />
          </div>

          <div className={styles.info}>
            <Text className={styles.name}>{user.name}</Text>
            <Text className={styles.bio}>{user.bio}</Text>

            <div className={styles.metadata}>
              <div className={styles.metadataItem}>
                <MapPin className="w-4 h-4" />
                <Text>{user.location}</Text>
              </div>
              <div className={styles.metadataItem}>
                <Calendar className="w-4 h-4" />
                <Text>Joined {user.joinedDate}</Text>
              </div>
              <div className={styles.metadataItem}>
                <Star className={`w-4 h-4 ${styles.starIcon}`} />
                <Text>
                  {user.rating} ({user.reviewCount} reviews)
                </Text>
              </div>
            </div>

            <div className={styles.actions}>
              <Button className={styles.messageBtn} variant="startLearning">
                <MessageCircle className="w-4 h-4" />
                <Text className={styles.message}>Message</Text>
              </Button>
              <div className={styles.sessionsInfo}>
                <Users className="w-4 h-4" />
                <Text>{user.sessionsCompleted} sessions completed</Text>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Overlay 
        isOpen={isEditDialogOpen} 
        onClose={handleEditClose}
        title="Edit Profile"
      >
        <EditDetailsForm 
          user={user} 
          onSave={handleUserUpdate}
          onCancel={handleEditClose}
        />
      </Overlay>
    </>
  );
};

export default ProfileHeader;