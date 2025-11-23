#include <napi.h>
#include <string>
#include <vector>

/**
 * Native C++ bridge for calling TypeScript transliterator
 * This uses Node-API to call JavaScript from C++
 */

class TransliteratorWrapper : public Napi::ObjectWrap<TransliteratorWrapper> {
 public:
  static Napi::Object Init(Napi::Env env, Napi::Object exports);
  TransliteratorWrapper(const Napi::CallbackInfo& info);

 private:
  Napi::Value Convert(const Napi::CallbackInfo& info);
  Napi::Value GetSuggestions(const Napi::CallbackInfo& info);
  Napi::Value UpdateConfig(const Napi::CallbackInfo& info);

  Napi::FunctionReference js_convert_;
  Napi::FunctionReference js_get_suggestions_;
  Napi::FunctionReference js_update_config_;
};

TransliteratorWrapper::TransliteratorWrapper(const Napi::CallbackInfo& info)
    : Napi::ObjectWrap<TransliteratorWrapper>(info) {
  Napi::Env env = info.Env();

  // Expect a JavaScript bridge object with convert, getSuggestions, updateConfig methods
  if (info.Length() < 1 || !info[0].IsObject()) {
    Napi::TypeError::New(env, "Bridge object expected").ThrowAsJavaScriptException();
    return;
  }

  Napi::Object bridge = info[0].As<Napi::Object>();

  // Store references to JavaScript functions
  js_convert_ = Napi::Persistent(bridge.Get("convert").As<Napi::Function>());
  js_get_suggestions_ = Napi::Persistent(bridge.Get("getSuggestions").As<Napi::Function>());
  js_update_config_ = Napi::Persistent(bridge.Get("updateConfig").As<Napi::Function>());
}

Napi::Object TransliteratorWrapper::Init(Napi::Env env, Napi::Object exports) {
  Napi::Function func = DefineClass(env, "TransliteratorWrapper", {
    InstanceMethod("convert", &TransliteratorWrapper::Convert),
    InstanceMethod("getSuggestions", &TransliteratorWrapper::GetSuggestions),
    InstanceMethod("updateConfig", &TransliteratorWrapper::UpdateConfig),
  });

  Napi::FunctionReference* constructor = new Napi::FunctionReference();
  *constructor = Napi::Persistent(func);
  env.SetInstanceData(constructor);

  exports.Set("TransliteratorWrapper", func);
  return exports;
}

Napi::Value TransliteratorWrapper::Convert(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  if (info.Length() < 1 || !info[0].IsString()) {
    Napi::TypeError::New(env, "String expected").ThrowAsJavaScriptException();
    return env.Null();
  }

  std::string input = info[0].As<Napi::String>().Utf8Value();

  // Call JavaScript convert function
  Napi::Value result = js_convert_.Call({Napi::String::New(env, input)});

  return result;
}

Napi::Value TransliteratorWrapper::GetSuggestions(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  if (info.Length() < 1 || !info[0].IsString()) {
    Napi::TypeError::New(env, "String expected").ThrowAsJavaScriptException();
    return env.Null();
  }

  std::string input = info[0].As<Napi::String>().Utf8Value();
  int limit = 5;

  if (info.Length() >= 2 && info[1].IsNumber()) {
    limit = info[1].As<Napi::Number>().Int32Value();
  }

  // Call JavaScript getSuggestions function
  Napi::Value result = js_get_suggestions_.Call({
    Napi::String::New(env, input),
    Napi::Number::New(env, limit)
  });

  return result;
}

Napi::Value TransliteratorWrapper::UpdateConfig(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  if (info.Length() < 2 || !info[0].IsString() || !info[1].IsString()) {
    Napi::TypeError::New(env, "Two strings expected (mode, digitFormat)").ThrowAsJavaScriptException();
    return env.Null();
  }

  // Call JavaScript updateConfig function
  js_update_config_.Call({info[0], info[1]});

  return env.Undefined();
}

Napi::Object InitAll(Napi::Env env, Napi::Object exports) {
  return TransliteratorWrapper::Init(env, exports);
}

NODE_API_MODULE(onusshar_ime_bridge, InitAll)
