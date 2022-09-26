#include <map>
#include <vector>

/**
 * @brief 
 * 
 * @param list 
 * @param target 
 * @return std::vector<int> 
 */
std::vector<int> twoSumWith2For(std::vector<int> list, int target) {
  std::vector<int> result;
  for (int i = 0; i < list.size(); i++) {
    for (int j = i + 1; i < list.size(); j++) {
      if (list.at(i) + list.at(j) == target) {
        result.push_back(i);
        result.push_back(j);

        return result;
      }
    }
  }

  return result;
}

std::vector<int> twoSumWithCache(std::vector<int> list, int target) {
  std::map<int, int> cache;
  std::vector<int> result;

  for (size_t i = 0; i < list.size(); i++) {
    if (cache.find(list.at(i)) != cache.end()) {
      result.push_back(cache.at(list.at(i)));
      result.push_back(i);

      return result;
    }

    cache.insert(std::pair<int, int>(target - list.at(i), i));
  }

  return result;
}
