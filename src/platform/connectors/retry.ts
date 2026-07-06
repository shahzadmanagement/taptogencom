/**
 * Automatically retries tasks operations loops matching specs limits
 * @param task target promise handler
 * @param retries count limit
 * @param delay delay margin ms
 * @returns task output response
 */
export async function retryTask<T>(task: () => Promise<T>, retries = 3, delay = 1000): Promise<T> {
  try {
    return await task();
  } catch (err) {
    if (retries <= 1) throw err;
    await new Promise(resolve => setTimeout(resolve, delay));
    return retryTask(task, retries - 1, delay * 2); // exponential backoff
  }
}
