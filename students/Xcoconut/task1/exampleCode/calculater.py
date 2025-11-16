import tkinter as tk
from tkinter import messagebox

class Calculator:
    def __init__(self, root):
        self.root = root
        self.root.title("简单计算器")
        self.root.geometry("300x400")
        
        # 创建显示区域
        self.display_var = tk.StringVar()
        self.display_var.set("0")
        
        display = tk.Entry(
            root, 
            textvariable=self.display_var, 
            font=("Arial", 18), 
            justify="right", 
            bd=10, 
            relief=tk.RIDGE
        )
        display.pack(pady=10, padx=10, fill=tk.BOTH)
        
        # 创建按钮框架
        button_frame = tk.Frame(root)
        button_frame.pack(pady=10, padx=10, expand=True, fill=tk.BOTH)
        
        # 按钮布局
        buttons = [
            ['7', '8', '9', '/'],
            ['4', '5', '6', '*'],
            ['1', '2', '3', '-'],
            ['0', '.', '=', '+'],
            ['C', 'CE']
        ]
        
        # 创建按钮
        for i, row in enumerate(buttons):
            for j, text in enumerate(row):
                if text == '=':
                    btn = tk.Button(
                        button_frame, 
                        text=text, 
                        font=("Arial", 14),
                        command=self.calculate,
                        bg="orange",
                        fg="white"
                    )
                elif text in ['C', 'CE']:
                    btn = tk.Button(
                        button_frame, 
                        text=text, 
                        font=("Arial", 14),
                        command=lambda t=text: self.clear(t),
                        bg="red",
                        fg="white"
                    )
                else:
                    btn = tk.Button(
                        button_frame, 
                        text=text, 
                        font=("Arial", 14),
                        command=lambda t=text: self.button_click(t)
                    )
                
                btn.grid(
                    row=i, 
                    column=j, 
                    sticky="nsew", 
                    padx=2, 
                    pady=2,
                    ipadx=10,
                    ipady=10
                )
                
                # 设置网格权重，使按钮可以扩展
                button_frame.grid_rowconfigure(i, weight=1)
                button_frame.grid_columnconfigure(j, weight=1)
    
    def button_click(self, char):
        current = self.display_var.get()
        
        if current == "0" or current == "错误":
            self.display_var.set(char)
        else:
            self.display_var.set(current + char)
    
    def calculate(self):
        try:
            expression = self.display_var.get()
            # 安全评估表达式
            result = eval(expression)
            self.display_var.set(str(result))
        except:
            self.display_var.set("错误")
    
    def clear(self, clear_type):
        if clear_type == "C":
            # 清除全部
            self.display_var.set("0")
        elif clear_type == "CE":
            # 清除最后一个字符
            current = self.display_var.get()
            if len(current) > 1:
                self.display_var.set(current[:-1])
            else:
                self.display_var.set("0")

if __name__ == "__main__":
    root = tk.Tk()
    calculator = Calculator(root)
    root.mainloop()
