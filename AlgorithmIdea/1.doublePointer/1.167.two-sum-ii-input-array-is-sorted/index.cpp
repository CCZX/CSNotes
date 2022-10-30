#include <vector>
#include <map>

class Solution {
public:
  std::vector<int> twoSum(std::vector<int>& numbers, int target) {
    int left = 0;
    int right = numbers.size() - 1;
    std::vector<int> res;

    while (left < right) {
      int sum = numbers.at(left) + numbers.at(right);

      if (sum == target) {
        res.push_back(left + 1);
        res.push_back(right + 1);
        break;
      }

      if (sum < target) {
        left ++;
      }

      if (sum > target) {
        right--;
      }
    }

    return res;
  };

  std::vector<int> twoSumWithMap(std::vector<int>& numbers, int target) {
    std::map<int, int> diffMap;
    std::vector<int> res;

    for (int i = 0; i < numbers.size(); i++) {
      int diff = target - numbers.at(i);
      if (diffMap.find(diff) != diffMap.end()) {
        res.push_back(diffMap.at(diff));
        res.push_back(i + 1);
        break;
      } else {
        diffMap.insert(std::pair<int, int>(numbers.at(i), i + 1));
      }
    }

    return res;
  };
};
