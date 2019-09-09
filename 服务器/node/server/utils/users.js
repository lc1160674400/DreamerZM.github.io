class Users {
    constructor() {
        this.users = [];
        this.rooms = [];
    }
    addUser(id, name, room, gender, isRoomChange=false) {
        // room is the room number
        if (this.rooms[room] == gender) {
            throw `2 ${gender} are in the same room!`;
            // window.alert(`2 ${gender} are in the same room!`);
            // window.location.href = '/';
        }
        if (this.rooms[room] == 'b') {
            // b means Both m & f are in the room
            throw "There are already 2 people in the room!";
            // window.alert("There are already 2 people in the room!");
            // window.location.href = '/';
        }
        if (this.rooms[room] == undefined) {
            // It is a new room (i.e. nobody is in the room)
            this.rooms[room] = gender;
        } else {
            // Now the room is full
            this.rooms[room] = 'b';
        }
    
        var user;
        if (isRoomChange) {
            user = this.getUser(id);
            user.room = room;
        } else {
            user = {id, name, room, gender, prev_room: null};
            this.users.push(user);
        }
        return user;
    }

    removeUser(id, preserve=false) {
        // preserve means the user is only "left", not "disconnected",
        // and thus preserve the user in the list

        var user = this.getUser(id);
        if (user) {
            if (this.rooms[user.room] == 'b') {
                // The user is left, then only the opposite gender is in the room
                this.rooms[user.room] = this.getOppositeGender(user.gender);
            } else if (this.rooms[user.room] == user.gender) {
                // The only person in the room is left, then the room becomes empty.
                this.rooms[user.room] = undefined;
            } else if (user.room != null) {
                throw 'Opposite gender found.';
            }
            if (preserve) {
                // TODO PASS BY REF?
                user.prev_room = user.room;
                user.room = null;
            } else {
                this.users = this.users.filter((user) => user.id !== id);
            }
        }
        return user;
    }
    getUser(id) {
        // console.log(`id: ${id}`);
        // console.log(`users: ${this.users.map((user) => user.id)}`);
        return this.users.filter((user) => user.id === id)[0];
    }
    getUserList(room) {
        var users = this.users.filter((user) => user.room === room);
        var namesArray = users.map(((user) => user.name));
        return namesArray;
    }
    getNextAvailableRoom(gender, id) {
        if (!['m', 'f'].includes(gender)) {
            // If `gender` is not m or f: There is some bug, 
            // or it is being hacked.
            throw 'Gender is not m or f';
        }

        // Ensure the user does not join the same room again
        var id = this.getUser(id);
        var prevRoom = null;
        if (id != null) {
            prevRoom = id.prev_room;
        }
        var newRoom;
        if (prevRoom == null) {
            newRoom = this.rooms; // Pass by reference
        } else {
            newRoom = this.rooms.slice(); // Pass by value
            newRoom[prevRoom] = 'b'; // Assuming both, so it won't be searched
        }

        if (newRoom.indexOf(this.getOppositeGender(gender)) == -1) {
            // Opposite gender not found
            if (newRoom.indexOf(undefined) == -1) {
                // All rooms are occupied: Open a new room
                return [newRoom.length, false]; // 0 means not found
            } else {
                // There is an empty room: Use it
                return [newRoom.indexOf(undefined), false];
            }
        } else {
            // Opposite gender found
            return [newRoom.indexOf(this.getOppositeGender(gender)), true];
        }
    }
    // Private Function
    getOppositeGender(gender) {
        switch (gender) {
            case 'm':
                return 'f'
                break;
            case 'f':
                return 'm';
                break;
            default:
                break;
        }
        // throw 'Gender should be either m or f';
        return '';
    }
}

module.exports = {Users};