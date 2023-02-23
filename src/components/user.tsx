import React, { useEffect, useState } from "react";
import { Box, Avatar, Text, Button, Flex } from "@chakra-ui/react";
import { userIndexData } from "../interfaces";

interface Props {
  user: userIndexData;
  selectedUsers: userIndexData[];
  selectUser: (user: userIndexData) => void;
}

const User: React.FC<Props> = ({ user, selectedUsers, selectUser }) => {
  const [isSelected, setIsSelected] = useState<boolean>(false);

  useEffect(() => {
    selectedUsers?.find((u) =>
      u?.id === user?.id ? setIsSelected(true) : setIsSelected(false)
    );
  }, [selectUser, selectedUsers]);

  return (
    <Box
      p={1}
      border="1px"
      borderRadius="20"
      borderColor={isSelected ? "black" : "gray.200"}
      onClick={() => selectUser(user)}>
      <Box>
        {isSelected && <Button onClick={() => selectUser(user)}>Cancle</Button>}
      </Box>
      <Flex direction="column">
        <Avatar size="xs" src={user.imgUrl} />
        <Text>{user.name}</Text>
      </Flex>
    </Box>
  );
};

export default User;
