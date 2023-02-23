import { useEffect, useState } from "react";
import { Box, Flex, Grid, Text, Button } from "@chakra-ui/react";
import axios from "axios";
import "./App.css";
import { ChakraBaseProvider, extendBaseTheme } from "@chakra-ui/react";
import chakraTheme from "@chakra-ui/theme";
import User from "./components/User";
import { userIndexData } from "./interfaces";
import { useToast } from "@chakra-ui/react";

const theme = extendBaseTheme({
  components: {},
});

function App() {
  const [users, setUsers] = useState<userIndexData[]>([]);
  const [matches, setMatches] = useState<userIndexData[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<userIndexData[]>([]);
  const toast = useToast();

  useEffect(() => {
    let formatedUsers: userIndexData[] = [];
    async function fetchUrls() {
      const usersFromAPi = await axios.get(
        "https://randomuser.me/api/?results=20"
      );
      usersFromAPi?.data?.results.map(
        (user: {
          id: { name: string; value: string };
          name: { first: string; last: string };
          picture: { thumbnail: string };
        }) => {
          formatedUsers.push({
            id: user.id.value,
            name: user.name.first + " " + user.name.last,
            imgUrl: user.picture.thumbnail,
          });
        }
      );
      formatedUsers.sort((a, b) =>
        a.name > b.name ? 1 : b.name > a.name ? -1 : 0
      );
      setUsers(formatedUsers);
    }
    fetchUrls();
    console.log(users);
  }, []);

  const selectUser = (user: userIndexData) => {
    let updateSelected: userIndexData[] = [...selectedUsers];
    if (selectedUsers.length < 2) {
      if (selectedUsers.find((u) => u.id === user?.id)) {
        updateSelected.filter((u) => u.id === user.id);
        toast({
          render: () => (
            <Box color="white" p={3} bg="orange.500" rounded="2xl">
              <Text fontSize="2xl">🗑️ Unselect User</Text>
              <Text>{`You unselect the user ${user.name}`}</Text>
            </Box>
          ),
        });
        setSelectedUsers(updateSelected);
      } else {
        toast({
          render: () => (
            <Box color="white" p={3} bg="green.500" rounded="2xl">
              <Text fontSize="2xl">✔️ Select User</Text>
              <Text>{`You Select the user ${user.name}`}</Text>
            </Box>
          ),
        });
        setSelectedUsers((prevState) => [...prevState, user]);
        console.log("should be two", selectedUsers);
      }
    } else {
      toast({
        render: () => (
          <Box color="white" p={3} bg="red.500" rounded="2xl">
            <Text fontSize="2xl"> Too many selected users!</Text>
            <Text>
              You should select only two users in order to create a match!
            </Text>
          </Box>
        ),
      });
    }
  };

  const createMatch = () => {
    if (selectedUsers.length === 2) {
      setMatches((prevState) => [...prevState, selectedUsers]);
      toast({
        title: "You created a new match",
        description: `Between ${selectedUsers[0]} to ${selectedUsers[1]}`,
        status: "success",
        duration: 3000,
      });
      setSelectedUsers([]);
    }
  };

  return (
    <ChakraBaseProvider theme={theme}>
      <div className="App">
        <Flex gap={30}>
          <Box>
            <Flex justify="center" gap={30} mb={2}>
              <Text fontSize="2xl">All Users</Text>
              {selectedUsers.length === 2 && (
                <Button p={1} bg="gray" color="white" onClick={createMatch}>
                  Create a Match
                </Button>
              )}
            </Flex>
            <Grid
              templateColumns="repeat(5, 1fr)"
              h="calc(90vh)"
              gap={1}
              p={4}
              borderRadius="20"
              border="1px"
              borderColor="gray.200">
              {users?.map((user, index) => (
                <Box key={user.id + index}>
                  <User
                    user={user}
                    selectedUsers={selectedUsers}
                    selectUser={selectUser}
                  />
                </Box>
              ))}
            </Grid>
          </Box>
          <Box>
            <Text fontSize="2xl">Users Matches</Text>
            <Grid
              templateColumns="repeat(2, 1fr)"
              h="calc(90vh)"
              w="400px"
              gap={1}
              p={4}
              borderRadius="20"
              border="1px"
              borderColor="gray.200">
              {matches.map((u, index) => (
                <Box key={u.id + index}>
                  <User
                    user={u}
                    selectedUsers={selectedUsers}
                    selectUser={selectUser}
                  />
                </Box>
              ))}
            </Grid>
          </Box>
        </Flex>
      </div>
    </ChakraBaseProvider>
  );
}

export default App;
