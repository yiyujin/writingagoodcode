import { detectStep } from './StepAnalysis.js';

describe('detectStep', () => {
    test('detects lines that start with //', () => {
      const lines = [
        "let x = 5;",
        "// Step One",
        "console.log(x);",
        "// Step Two",
        "console.log('done');"
      ];
      const expected = [
        { lineIndex: 1, content: 'Step One' },
        { lineIndex: 3, content: 'Step Two' }
      ];
      expect(detectStep(lines)).toEqual(expected);
    });
  });