// IM/2021/009 - Y.A.D.S.C.BASNAYAKE
import React, {useState} from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import styles from './style';


const App = () => {


  const [display, setDisplay] = useState('');
  const [result, setResult] = useState('');
  const [readyToReplace, setReadyToReplace] = useState(false);

  const handlePress = (value) => {
    // Avoid entering these characters at the beginning
    if (!display && ['%', '÷', '×', '+', '.'].includes(value)) {
      return;
    }

    if (readyToReplace && !isNaN(value)) {
      setDisplay(value.toString());
      setReadyToReplace(true);
    } else {
      setDisplay((prevDisplay) => prevDisplay + value.toString());
    }
    setResult('');
  };

  
  
  // Clears the display and result
  const handleClear = () => {
    setDisplay('');
    setResult('');
  };

  // Handles the backspace button press
  const handleBackspace = () => 
    setDisplay((prevDisplay) => (prevDisplay ? prevDisplay.slice(0, -1) : ""));
    


  // Handles the press of a bracket button
  const handleBracketPress = () => {
    const openBrackets = (display.match(/\(/g) || []).length;
    const closeBrackets = (display.match(/\)/g) || []).length;
    if (openBrackets > closeBrackets && !['+', '-', 'x', '÷', '('].includes(display.slice(-1))) {
        setDisplay(display + ')');
      } else {
        setDisplay(display + '(');
      }
      return;
    }
  

  // handles the press of an operator button
  const handleOperatorPress = (value) => {
    //  to avoid entering these characters at the beginning
    if (!display && ['%', '÷', '×', '+', '.','√'].includes(value)) {
      return;
    }

    if (value === '=') {
      //  to check for division by zero in the display 
      const normalizedDisplay = display.replace('÷', '/');
      if (normalizedDisplay.includes('/0') && !normalizedDisplay.includes('/0.')) {
        setResult("Can't divide by 0");
        setDisplay("");
        return;
      }

      // Check for invalid format (0/0.0)
      if (normalizedDisplay.includes('0/0.0')) {
        setResult("Invalid format");
        setDisplay("");
        return;
      }

  
      try {
        // replace the multiplication and division symbols and evaluate the expression
        const evalResult = eval(display.replace('×', '*').replace('÷', '/'));
        if(!isFinite(evalResult)){ 
            setResult("error");
            return;
        } else {
          // round the result to 6 decimal places
          const formattedResult = Number(evalResult.toFixed(6)).toString();
          setResult(formattedResult);
          setDisplay(formattedResult);
          setReadyToReplace(true); //  after getting a result to allow replacing the result
        }
      } catch {
        setResult("Error");
        setDisplay("");
      }

    } else {
      if (value === '√') {
        // Check for negative numbers when calculating the √
        if(display>0){
          try {
            const result = Math.sqrt(parseFloat(display));
            const formattedResult = Number(result.toFixed(6)).toString();
            setResult(formattedResult);
            setDisplay(formattedResult);
            setReadyToReplace(true); 

            return
          } catch {
            setResult('Error');
          }
        }
        else{
          setResult('Negative number');
        }
        
        return;
      }

      
      // Avoid entering these operators multiple times near each other
      if (["+", "-", "×", "÷", "%",".","√"].includes(display.slice(-1))) {
        setDisplay((prevDisplay) => prevDisplay.slice(0, -1) + value);
      } else {
        setDisplay((prevDisplay) => prevDisplay + value);
      }
      setReadyToReplace(false);

      // Calculate the percentage
      if (value === '%') {
        try {
          const percentage = eval(`${display}/100`);
          const formattedResult = Number(percentage.toFixed(6)).toString();
          setResult(formattedResult);
          
        } catch (error) {
          setResult('Error');
        }
        return;
      }
    }
  };


  return (
    <View style={styles.container}>
      {/* Display section */}
      <View style={styles.display}>
        {/* equation display*/}
        { result === "" ?(
          <Text style={[styles.inputText, { letterSpacing: 3 }]}>{display}</Text>
        ) : (
          <Text style={[styles.inputText, { letterSpacing: 3, color: "#8e8e8e" }]}>{display}</Text>
        )}

        {/* Result display */}
        {result !== "" && (<Text style={styles.resultText}>{result}</Text>)}

        {/* Backspace button */}
        <TouchableOpacity style={styles.backspace} onPress={handleBackspace}>
          <Image source={require('./android/assets/icons/backspace.png')} 
          style={styles.icon} />
        </TouchableOpacity>
      </View>


      {/* Buttons section */}
      <View style={styles.buttonsContainer}>
        {/* Row 1 */}
        <View style={styles.row}>
          <TouchableOpacity style={styles.button}  onPress={handleClear}>
            <Text style={styles.buttonTextSpecial}>C</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}onPress={() => handleOperatorPress('√')}>
            <Text style={styles.buttonTextSpecial}>√</Text>
          </TouchableOpacity >
          <TouchableOpacity style={styles.button} onPress={() => handleOperatorPress('%')}>
            <Text style={styles.buttonTextSpecial}>%</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonSpecial} onPress={() => handleOperatorPress('÷')}>
            <Text style={styles.buttonTextSpecial}>÷</Text>
          </TouchableOpacity>
        </View>

        {/* Row 2 */}
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('7')}>
            <Text style={styles.buttonTextNum}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('8')}>
            <Text style={styles.buttonTextNum}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('9')}>
            <Text style={styles.buttonTextNum}>9</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonSpecial} onPress={() => handleOperatorPress('×')}>
            <Text style={styles.buttonTextSpecial}>×</Text>
          </TouchableOpacity>
        </View>

        {/* Row 3 */}
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('4')}>
            <Text style={styles.buttonTextNum}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('5')}>
            <Text style={styles.buttonTextNum}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('6')}>
            <Text style={styles.buttonTextNum}>6</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonSpecial} onPress={() => handleOperatorPress('-')}>
            <Text style={styles.buttonTextSpecial}>−</Text>
          </TouchableOpacity>
        </View>

        {/* Row 4 */}
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('1')}>
            <Text style={styles.buttonTextNum}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('2')}>
            <Text style={styles.buttonTextNum}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('3')}>
            <Text style={styles.buttonTextNum}>3</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonSpecial} onPress={() => handleOperatorPress('+')}>
            <Text style={styles.buttonTextSpecial}>+</Text>
          </TouchableOpacity>
        </View>

        {/* Row 5 */}
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={handleBracketPress}>
            <Text style={styles.buttonTextSpecial}>( )</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('0')}>
            <Text style={styles.buttonTextNum}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleOperatorPress('.')}>
            <Text style={styles.buttonTextSpecial}>.</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonEqual} onPress={() => handleOperatorPress('=')}>
            <Text style={styles.buttonEqualText}>=</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
  


export default App;
