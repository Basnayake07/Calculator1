// IM/2021/009 - Y.A.D.S.C.BASNAYAKE
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  display: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    borderBottomWidth: 1,
    borderBottomColor: '#A9A9A9',
    margin: 5,
    marginBottom: 15,
    marginTop: 15,
    paddingRight: 10,
  },
  backspace: {
    position: 'absolute', // Allow precise positioning in the display area
    bottom: 10, 
    right: 10,
  },
  inputText: {
    fontSize: 48, 
    color: '#6495ED',
  },
  resultText: {
    fontSize: 36, 
    color: '#fff',
    fontWeight: 'bold',
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button: {
    width: 70,
    height: 70,
    backgroundColor: "#373636",
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  buttonSpecial: {
    width: 70,
    height: 70,
    backgroundColor: "#7393B3",
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  buttonEqual: {
    width: 70,
    height: 70,
    backgroundColor: "#00008B", 
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },

  buttonEqualText: {
    fontSize: 32,
    color: "#FFFFFF",
  },

  buttonText: {
    fontSize: 28,
    color: "#FFFFFF",
  },
  
  buttonTextSpecial: {
    fontSize: 36,
    fontStyle: "bold",
    color: "#00008B"},
     
  buttonTextNum: {
    fontSize: 28,
    color: "#6495ED",
    fontStyle: "bold",  
  },

  icon: {
    width: 26, 
    height: 26, 
    tintColor: 'white',
  },
  
});
